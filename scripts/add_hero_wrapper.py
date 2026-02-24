#!/usr/bin/env python3
"""
Add <div className="hero-wrapper"> wrapping around Breadcrumb + Hero sections.

Pattern 1: Files with <Breadcrumb component import
Pattern 2: Files with inline <nav className="breadcrumb"

Both patterns wrap from the {/* パンくず */} comment through the closing </header>
of the first <header className="hero"> block.
"""

import os
import re
import subprocess

BASE_DIR = "/Users/takahiro/Desktop/used-lab-next"

def find_pattern1_files():
    """Find files with import Breadcrumb + className="hero", excluding [slug]/components/"""
    result = subprocess.run(
        ["grep", "-rl", "import Breadcrumb", "app/(public)/"],
        capture_output=True, text=True, cwd=BASE_DIR
    )
    files = []
    for f in result.stdout.strip().split("\n"):
        if not f:
            continue
        if "[slug]/components/" in f:
            continue
        filepath = os.path.join(BASE_DIR, f)
        with open(filepath, "r") as fh:
            content = fh.read()
        if 'className="hero"' in content:
            files.append(filepath)
    return sorted(files)

def find_pattern2_files():
    """Find files with inline className="breadcrumb" + className="hero", excluding [slug]/components/ and Pattern 1"""
    result = subprocess.run(
        ["grep", "-rl", 'className="breadcrumb"', "app/(public)/"],
        capture_output=True, text=True, cwd=BASE_DIR
    )
    files = []
    for f in result.stdout.strip().split("\n"):
        if not f:
            continue
        if "[slug]/components/" in f:
            continue
        filepath = os.path.join(BASE_DIR, f)
        with open(filepath, "r") as fh:
            content = fh.read()
        if 'className="hero"' in content and "import Breadcrumb" not in content:
            files.append(filepath)
    return sorted(files)

def get_indentation(line):
    """Return the leading whitespace of a line."""
    return len(line) - len(line.lstrip())

def find_closing_header(lines, start_idx):
    """
    Find the closing </header> that matches the <header className="hero"> at start_idx.
    Tracks nesting of <header> tags.
    """
    depth = 0
    for i in range(start_idx, len(lines)):
        line = lines[i]
        # Count opening <header tags (not self-closing)
        opens = len(re.findall(r'<header\b', line))
        closes = len(re.findall(r'</header>', line))
        depth += opens - closes
        if depth <= 0 and closes > 0:
            return i
    return None

def process_file(filepath, pattern_type):
    """
    Add hero-wrapper div around breadcrumb + hero section.
    
    pattern_type: 1 for Breadcrumb component, 2 for inline nav breadcrumb
    """
    with open(filepath, "r") as f:
        content = f.read()
    
    # Skip if already has hero-wrapper
    if "hero-wrapper" in content:
        print(f"  SKIP (already has hero-wrapper): {filepath}")
        return False
    
    lines = content.split("\n")
    
    # Find the breadcrumb comment line {/* パンくず */}
    breadcrumb_comment_idx = None
    for i, line in enumerate(lines):
        if "{/* パンくず */}" in line:
            breadcrumb_comment_idx = i
            break
    
    if breadcrumb_comment_idx is None:
        # Try to find the breadcrumb element directly
        if pattern_type == 1:
            for i, line in enumerate(lines):
                if "<Breadcrumb" in line:
                    breadcrumb_comment_idx = i
                    break
        else:
            for i, line in enumerate(lines):
                if 'className="breadcrumb"' in line:
                    breadcrumb_comment_idx = i
                    break
    
    if breadcrumb_comment_idx is None:
        print(f"  ERROR: Could not find breadcrumb in {filepath}")
        return False
    
    # Find the first <header className="hero"> after the breadcrumb
    hero_header_idx = None
    for i in range(breadcrumb_comment_idx, len(lines)):
        if 'className="hero"' in lines[i] and "<header" in lines[i]:
            hero_header_idx = i
            break
    
    if hero_header_idx is None:
        # Check if className="hero" is on same line or next line as <header
        for i in range(breadcrumb_comment_idx, len(lines)):
            if '<header' in lines[i]:
                # Check this line and the next for className="hero"
                check_range = lines[i]
                if i + 1 < len(lines):
                    check_range += lines[i + 1]
                if 'className="hero"' in check_range:
                    hero_header_idx = i
                    break
    
    if hero_header_idx is None:
        print(f"  ERROR: Could not find <header className=\"hero\"> after breadcrumb in {filepath}")
        return False
    
    # Find the closing </header> for this hero header
    closing_header_idx = find_closing_header(lines, hero_header_idx)
    
    if closing_header_idx is None:
        print(f"  ERROR: Could not find closing </header> in {filepath}")
        return False
    
    # Determine indentation from the breadcrumb comment line
    indent = " " * get_indentation(lines[breadcrumb_comment_idx])
    
    # Insert the wrapper
    # Add closing </div> after the </header> line
    lines.insert(closing_header_idx + 1, f"{indent}</div>")
    # Add opening <div className="hero-wrapper"> before the breadcrumb comment
    lines.insert(breadcrumb_comment_idx, f'{indent}<div className="hero-wrapper">')
    
    # Write back
    with open(filepath, "w") as f:
        f.write("\n".join(lines))
    
    return True

def main():
    print("=" * 60)
    print("Adding hero-wrapper divs")
    print("=" * 60)
    
    # Pattern 1
    pattern1_files = find_pattern1_files()
    print(f"\nPattern 1 (Breadcrumb component): {len(pattern1_files)} files")
    print("-" * 40)
    
    p1_count = 0
    for f in pattern1_files:
        rel = os.path.relpath(f, BASE_DIR)
        success = process_file(f, 1)
        if success:
            print(f"  OK: {rel}")
            p1_count += 1
    
    # Pattern 2
    pattern2_files = find_pattern2_files()
    print(f"\nPattern 2 (inline breadcrumb nav): {len(pattern2_files)} files")
    print("-" * 40)
    
    p2_count = 0
    for f in pattern2_files:
        rel = os.path.relpath(f, BASE_DIR)
        success = process_file(f, 2)
        if success:
            print(f"  OK: {rel}")
            p2_count += 1
    
    print(f"\nDone! Modified {p1_count + p2_count} files ({p1_count} Pattern 1 + {p2_count} Pattern 2)")

if __name__ == "__main__":
    main()
