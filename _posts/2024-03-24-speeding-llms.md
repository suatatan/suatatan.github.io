---
date: 2024-03-24
layout: post
tags:
- cite
- english
- quickread
- technology
title: Speeding LLMs
---

"points:

Use precision reduction: float16 or bfloat16. This will speed up the model by ~20% and reduce memory consumption by 2x. Use 8-bit or 4-bit quantization to reduce memory consumption by 2x or 3x. This is best when running on small devices where memory size is limited. Be careful: quantization degrades the quality of predictions. Use fine-tuning with adapters (LoRA, QLoRA) to improve prediction accuracy on your data. Works well in combination with quantization afterward. Use tensor parallelism for faster inference on multiple GPUs to run large models. If possible, use libraries for LLM inference and serving, such as Text Generation Inference, DeepSpeed, or vLLM. These already include various optimization techniques: tensor parallelism, quantization, continuous batching of incoming requests, optimized CUDA kernels, and more. Do some preliminary tests before using it in production. I spent a lot of time fixing bugs in some libraries I used. Also, not all LLMs have working solutions. Don’t forget to evaluate the final solution. It is good to have the prepared dataset for quick tests."
