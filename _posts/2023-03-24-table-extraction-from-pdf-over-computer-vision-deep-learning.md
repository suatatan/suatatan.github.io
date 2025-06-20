---
categories:
- bilgisayar
- english
date: 2023-03-24
layout: post
tags:
- computer-vision
- deep-learning
- english
- longread
- python
- technology
title: Table Extraction from PDF over Computer Vision + Deep Learning
---

\- There are two types of PDF files. One is you cannot copy and paste text from there they are kind of pictures. Another is a  document like a word you can copy and paste.

\- To process both types you need to convert the first one to the second if you encounter one. For this purpose, you need to use the OCRmypdf library. It simply converts the image-based PDF into a textbase. Once you did this you can go next steps.

\- There is one library for parsing PDFs PyPDF2. This library has functions for text extraction. Also, you can crop part of any PDF document if you know the coordinates of the relevant element. Pictures, images and other kinds of things can be extracted.

\- Abovementioned library is extract things from the PDF. Another option is converting all pages of the PDF into an image. This option would be useful if you use computer vision methods. This library is pdf2image.

\- Another PDF extractor library is Camelot. It focuses only on table extraction from PDF. For extraction of tables, it has "lattice" and "stream" options the advised one is "stream". It also provides extraction of the table over coordinates (left top to right bottom).

\- If you focus on these steps, you can guess that we have a pipeline to extract the tables from the PDF files step by step. These steps are Step1: Convert PDF to Image, Step2: Detect Tables with Deep learning (I didn't explain it yet) and boundaries, Step 3: Get boundary coordinates and feed camleot to take the table.

\- In computer vision there is a powerful library YOLO. It is useful also for table detection. There are pretrained options that you can directly use it but if you need you can train and empowert the model for your own custom tables. For this purpose there is a tool MakeSense that enables you  annotate your images to create train data.
