# notebook-autorun

This is a Python package to allow auto-run of certains cells in a Jupyter notebook at kernel start.  
For security reasons it only works in **trusted** notebooks.  

## 1 - Install

From terminal:

```bash
pip install notebook_autorun
```

## 2 - User Guide

In a notebook cell:

```Python
from notebook_autorun import Autorun
# example
cells = [2, 3]
Autorun(cells=cells).add_js()
# (0-indexed) cells 2, 3 will be run at notebook start 
```

This will inject javascript code in the output cell.  
This code will react on the next `kernel_ready.Kernel` event (i.e. at notebook start or kernel restart) to execute the selected cells.  
To get rid of this code just clear the output cell.

#### 2.1 - How to select cells for autorun

The cells to autorun can be determined by one of the 3 args below.  
Only one of them must be specified:  
+ `cells`: List of 0-indexed cells or String representing a list of cells. [Python list slices](https://docs.python.org/2.3/whatsnew/section-slices.html) are allowed. Default is `None`. `cells` is stringified to `str_cells` before passing to javascript. Invalid cell numbers (e.g. greater than the notebook number of cells) are ignored.  

    Examples: 
    ```Python
    # Assuming a notebook of 10 cells

    cells = [5, 7, 8]
    Autorun(cells=cells).add_js()
    # cells 5, 7, 8 will be run  

    cells = '2, 25 , 26, -1'
    Autorun(cells=cells).add_js()
    # cells 2 and 9 will be run  

    cells = '2:'
    Autorun(cells=cells).add_js()
    # all cells from 2 to 9 included will be run  

    cells = ':-3'
    Autorun(cells=cells).add_js()
    # cells 7, 8, 9 will be run  

    cells = '4:8'
    Autorun(cells=cells).add_js()
    # cells 4, 5, 6, 7 will be run  

    cells = '4:8:2'
    Autorun(cells=cells).add_js()
    # cells 4, 6 will be run  

    cells = '::-1'
    Autorun(cells=cells).add_js()
    # all cells will be run in reverse order  

    cells = '-2:-6:-2'
    Autorun(cells=cells).add_js()
    # cells 8, 7, 6, 5 will be run  
    ```


+ `metadata`: Boolean (default is `False`). If `True`, all cells with medatada `"autorun": true` are concerned.  

    Example: 
    ```Python
    Autorun(metadata=True).add_js()
    # all cells with metadata "autorun: true" will be run  
    ```

+ `comment`: Boolean (default is `False`). If `True`, all cells containing a comment `comment_flag` (default is `# AUTORUN`) are concerned.  

    Example: 
    ```Python
    Autorun(comment=True).add_js()
    # all cells including the string "# AUTORUN" will be run  

    Autorun(comment=True, comment_flag='# MYCUSTOMFLAG').add_js()
    # all cells including the string "# MYCUSTOMFLAG" will be run  
    ```

### 2.2 - Status message

By default `verbose=True`.  
It displays a warnnig message then status info:

```Python
Autorun(metadata=True).add_js()

# will display the following warning:
If you see <IPython.core.display.Javascript object> below, this notebook is not trusted.
As a consequence Autorun cannot work.
Run "from notebook_autorun import Autorun; Autorun.info()" for more info.

# then status info
This output cell contains notebook-autorun settings:
   {"str_cells": null, "metadata": true, "comment": false, "comment_flag": "# AUTORUN"}
```

You can remove these messages:

```Python
Autorun(metadata=True).add_js()
# no visible output - but the js code is injected
```

#### 2 - Security

Because a notebook is designed to allow the user to write arbitrary code, it has full access to many resources.   

The typical risks are the following:
+ A notebook has access to your file system and can therefore potentially read/modify/delete any of your files or send them to an attacker, or write a new file (virus).  
+ A notebook may contain javascript in output cells which can read you cookies and local storage and potentially send them to an attacker.  

See the [Security in notebook documents](https://jupyter-notebook.readthedocs.io/en/stable/security.html#security-in-notebook-documents) section of the official [Jupyter Notebook documentation](https://jupyter-notebook.readthedocs.io/en/stable/index.html) for more info.  

Therefore you **should review** and **must trust** the notebook before you can use **notebook-autorun**.

Example in the case of an untrusted notebook:

```Python
# notebook is not trusted
Autorun(metadata=True).add_js()

# will display the following warning:
If you see <IPython.core.display.Javascript object> below, this notebook is not trusted.
As a consequence Autorun cannot work.
Run "from notebook_autorun import Autorun; Autorun.info()" for more info.

# then the Javascript object - un-executed
<IPython.core.display.Javascript object>

# then the Markdown object - un-executed
<IPython.core.display.Markdown object>
```

As the warning message indicates you can get this section info with:

```Python
from notebook_autorun import Autorun
Autorun.info()
```


<!-- pandoc --from=markdown --to=rst --output=README.rst README.md -->
