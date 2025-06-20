---
title: "Deploying LLMs"
date: 2024-03-24
---

"Despite the abundance of frameworks for LLMs inference, each serves its specific purpose. Here are some key points to consider:

Use vLLM when maximum speed is required for batched prompt delivery. Opt for Text generation inference if you need native HuggingFace support and don’t plan to use multiple adapters for the core model. Consider CTranslate2 if speed is important to you and if you plan to run inference on the CPU. Choose OpenLLM if you want to connect adapters to the core model and utilize HuggingFace Agents, especially if you are not solely relying on PyTorch. Consider Ray Serve for a stable pipeline and flexible deployment. It is best suited for more mature projects. Utilize MLC LLM if you want to natively deploy LLMs on the client-side (edge computing), for instance, on Android or iPhone platforms."
