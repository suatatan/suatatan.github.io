---
categories:
- bilgisayar
date: 2023-03-14
layout: post
tags:
- data-frame
- english
- longread
- python
- technology
title: SQL queries on pandas data frame
---

Is this possible?

```
%sql my_df << SELECT 'Off and flying!' as a_duckdb_column
```

DuckDB’s Python client can be used directly in Jupyter notebooks with no additional configuration if desired. However, additional libraries can be used to simplify SQL query development. This guide will describe how to utilize those additional libraries. See other guides in the Python section for how to use DuckDB and Python together.
