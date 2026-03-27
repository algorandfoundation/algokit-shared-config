# Configuration file for Sphinx devportal markdown output.
# This config produces cleaner markdown for the Starlight/Astro developer portal.
#
# Usage: sphinx-build -b markdown -c docs/_configs/devportal docs .devportal/api

import sys
from pathlib import Path

# Add parent docs directory to path so we can import base config and extensions
docs_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(docs_dir))
sys.path.insert(0, str(docs_dir / "_extensions"))

# Import base configuration
from conf import *  # noqa: F401, F403

# Override project info for devportal context
project = "algokit-subscriber"

# Exclude folders not needed for devportal API docs build:
# - apidocs: devportal uses 'api' instead (via autodoc2_output_dir)
# - guides: copied separately by GitHub Action (not processed by Sphinx)
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store", "apidocs", "guides"]

# Devportal-specific extensions (remove HTML-specific ones like sphinx.ext.githubpages, sphinx_copybutton)
extensions = [
    "myst_parser",
    "autodoc2",
    "sphinx.ext.doctest",  # Keep for testcode/testoutput directives
    "devportal",  # Add YAML frontmatter and restructure output for devportal
]

# Disable HTML-specific features
html_static_path = []
html_css_files = []

# Devportal doesn't need intersphinx links
intersphinx_mapping = {}

# Simpler autodoc2 settings for cleaner markdown
# Path is relative to the source directory (docs/), not the config directory
autodoc2_packages = [
    {
        "path": "../src/algokit_subscriber",
        "auto_mode": True,
    },
]
autodoc2_render_plugin = "myst"
autodoc2_hidden_objects = [
    "private",
]
add_module_names = False
autodoc2_index_template = None
# Output API docs to 'api' folder instead of 'apidocs' for devportal
autodoc2_output_dir = "api"

# Suppress more warnings for markdown output
suppress_warnings = [
    "myst.xref_missing",
    "autodoc2.dup_item",
    "ref.python",
    "ref.class",
    "ref.obj",
    "toc.excluded",
]
