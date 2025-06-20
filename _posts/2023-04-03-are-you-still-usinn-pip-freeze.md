---
title: "Are you still using pip &gt; freeze"
date: 2023-04-03
---

Imagine you have a project and you've used dozens of different libraries. However, you accidentally deleted the virtual environment (.venv) or you need to run the project on another machine. You would have to do the installation ten times in the console to run the project. Is that necessary? No! Let Pipreqs do it for you."

One way to do this is by using the `pipreqs` package, which automatically scans a project's source code and generates a `requirements.txt` file based on the project's dependencies.

To use `pipreqs`, you'll need to install it first using pip. You can do this by running the following command in your terminal:

```
pip install pipreqs
```

Once you have `pipreqs` installed, navigate to the folder containing your Python files in your terminal and run the following command:

```
pipreqs . --force
```

This command tells `pipreqs` to search for Python files in the current directory (denoted by `.`) and generate a `requirements.txt` file based on the project's dependencies. The `--force` flag tells `pipreqs` to overwrite the `requirements.txt` file if it already exists.

After running this command, you should see a `requirements.txt` file in your folder containing a list of the required packages and their versions. You can use this file to install the dependencies for your project using `pip` by running the following command:

```
pip install -r requirements.txt
```

This will install all the required packages listed in the `requirements.txt` file.
