import React from "react";

interface SkillIconProps {
  name: string;
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = "h-5 w-5" }) => {
  const n = name.toLowerCase();

  // 1. Python
  if (n.includes("python")) {
    return (
      <svg viewBox="0 0 128 128" className={className} fill="none">
        <path
          fill="url(#pyA)"
          d="M63.5 12c-27.4 0-25.7 11.9-25.7 11.9l.03 12.3h26.2v3.7H25.4S12 38.3 12 65.7c0 27.5 11.7 26.5 11.7 26.5h7V80.3s-.4-14.2 13.9-14.2h23.9s13.4.2 13.4-13.1V25.2S86.2 12 63.5 12zm-14.4 7.6a4.3 4.3 0 110 8.6 4.3 4.3 0 010-8.6z"
        />
        <path
          fill="url(#pyB)"
          d="M64.5 116c27.4 0 25.7-11.9 25.7-11.9l-.03-12.3H64V88.1h38.6s13.4 1.6 13.4-25.8c0-27.5-11.7-26.5-11.7-26.5h-7v11.9s.4 14.2-13.9 14.2H49.5s-13.4-.2-13.4 13.1v27.8S41.8 116 64.5 116zm14.4-7.6a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6z"
        />
        <defs>
          <linearGradient id="pyA" x1="12" y1="12" x2="86" y2="86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#387EB8" />
            <stop offset="1" stopColor="#366994" />
          </linearGradient>
          <linearGradient id="pyB" x1="42" y1="42" x2="116" y2="116" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE873" />
            <stop offset="1" stopColor="#FFD43B" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // 2. PyTorch
  if (n.includes("pytorch")) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path
          fill="#EE4C2C"
          d="M13.6 2.2a9.6 9.6 0 00-6.8 2.8 9.6 9.6 0 000 13.6l1.3-1.3a7.8 7.8 0 010-11 7.8 7.8 0 0111 0l1.3-1.3a9.6 9.6 0 00-6.8-2.8zm3.8 2.8a1 1 0 100 2 1 1 0 000-2zm-5.4 7a1.8 1.8 0 00-1.8 1.8c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-1-.8-1.8-1.8-1.8z"
        />
      </svg>
    );
  }

  // 3. Docker
  if (n.includes("docker")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#2496ED">
        <path d="M13.98 11.08h1.83V9.25h-1.83v1.83zm-2.45 0h1.83V9.25h-1.83v1.83zm-2.46 0h1.83V9.25H9.07v1.83zm-2.46 0h1.83V9.25H6.61v1.83zm4.91-2.45h1.83V6.8h-1.83v1.83zm-2.45 0h1.83V6.8H9.07v1.83zm4.91 0h1.83V6.8h-1.83v1.83zm-2.46-2.46h1.83V4.34h-1.83v1.83zM23.7 11.7c-.5-.38-1.63-.5-2.58-.2-.36-.92-1.07-1.42-1.92-1.42-.3 0-.62.06-.92.2a6.38 6.38 0 00-4.5-1.93H.3c-.16.8.08 1.63.64 2.22C1.56 11.2 2 12.3 2 13.5c0 4.2 3.8 7.6 8.5 7.6 5.8 0 10.6-3.8 11.8-9 1.1-.1 1.7-.3 2.1-.5.3-.2.3-.5-.7-.9z" />
      </svg>
    );
  }

  // 4. AWS
  if (n.includes("aws")) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path
          fill="#FF9900"
          d="M6.8 17.5c2.9 1.8 6.6 2.3 10.4 1.3 1.2-.3 2.5-.8 3.5-1.5.4-.3.9.1.6.5-1.1 1.4-2.8 2.3-4.6 2.7-3.9 1-8.1.3-11.4-1.7-.5-.3-.1-.9.5-.8zm14.8-1.2c-.3-.4-1.8-.2-2.8-.1-.3 0-.3-.3 0-.5 1.5-.9 3.2-.6 3.5-.2.3.4-.2 2.1-1.6 3.1-.3.2-.5.1-.4-.2.4-.8 1.6-1.7 1.3-2.1z"
        />
        <path
          fill="#FFFFFF"
          d="M7.7 8.5c-.3-.2-.8-.4-1.3-.4-.9 0-1.5.5-1.5 1.3 0 .7.5 1.1 1.3 1.3l1.5.3v-2.5zm0 3.7l-1.5-.3c-1.6-.3-2.4-1.3-2.4-2.5 0-1.6 1.4-2.7 3.2-2.7 1.1 0 2.1.4 2.7.9l-.8 1.1c-.5-.4-1.1-.7-1.9-.7-1 0-1.8.6-1.8 1.5 0 .8.5 1.2 1.5 1.4l1.6.3v.8zm6.5-5.5h1.7l-2.4 8.5h-1.6l-1.4-5.3-1.4 5.3H7.5l-2.4-8.5h1.7l1.5 6 1.4-5.4h1.5l1.4 5.4 1.6-5.8zm4.5 5.5c-.3-.2-.8-.4-1.3-.4-.9 0-1.5.5-1.5 1.3 0 .7.5 1.1 1.3 1.3l1.5.3v-2.5zm0 3.7l-1.5-.3c-1.6-.3-2.4-1.3-2.4-2.5 0-1.6 1.4-2.7 3.2-2.7 1.1 0 2.1.4 2.7.9l-.8 1.1c-.5-.4-1.1-.7-1.9-.7-1 0-1.8.6-1.8 1.5 0 .8.5 1.2 1.5 1.4l1.6.3v.8z"
        />
      </svg>
    );
  }

  // 5. Git / GitHub
  if (n.includes("git")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#F05032">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.6c.2.2.4.4.5.7.5.9.2 2.1-.7 2.6-.9.5-2.1.2-2.6-.7-.5-.9-.2-2.1.7-2.6.4-.2.8-.3 1.2-.2V8.4c-.4.1-.8 0-1.2-.2-.9-.5-1.2-1.7-.7-2.6.2-.4.6-.7 1-.9L8.3 2.1 2.4 8c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.6-.6.6-1.5 0-2.1z" />
      </svg>
    );
  }

  // 6. CARLA Simulator
  if (n.includes("carla")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <rect width="24" height="24" rx="6" fill="#00E5FF" fillOpacity="0.15" />
        <path
          d="M5 16.5l2-5.5h10l2 5.5H5zm3.5-3a1 1 0 110-2 1 1 0 010 2zm7 0a1 1 0 110-2 1 1 0 010 2zM7.5 7h9l1.5 3h-12l1.5-3z"
          fill="#00F0FF"
        />
      </svg>
    );
  }

  // 7. RL Models & Algorithms / Reinforcement Learning
  if (n.includes("rl models") || n.includes("reinforcement")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <circle cx="6" cy="6" r="3" stroke="#10B981" strokeWidth="2" />
        <circle cx="18" cy="6" r="3" stroke="#00F0FF" strokeWidth="2" />
        <circle cx="12" cy="18" r="3.5" fill="#10B981" />
        <path d="M8.5 7.5L10.5 15M15.5 7.5L13.5 15" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    );
  }

  // 8. Sensor Fusion (Radar/Depth)
  if (n.includes("sensor fusion") || n.includes("radar")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <circle cx="12" cy="12" r="9" stroke="#00FFC8" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="12" cy="12" r="5.5" stroke="#00FFC8" strokeWidth="1.5" strokeOpacity="0.7" />
        <circle cx="12" cy="12" r="2.5" fill="#00FFC8" />
        <path d="M12 3v9l6 6" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 9. Gymnasium & Custom Envs
  if (n.includes("gymnasium") || n.includes("gym")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <rect x="3" y="10" width="3" height="4" rx="1" fill="#EF4444" />
        <rect x="6" y="8" width="2" height="8" rx="1" fill="#EF4444" />
        <rect x="8" y="11" width="8" height="2" fill="#FFFFFF" />
        <rect x="16" y="8" width="2" height="8" rx="1" fill="#EF4444" />
        <rect x="18" y="10" width="3" height="4" rx="1" fill="#EF4444" />
      </svg>
    );
  }

  // 10. Autonomous Lane Changing / Evidential RL
  if (n.includes("lane changing") || n.includes("evidential") || n.includes("pomdp")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <path d="M7 3v18M17 3v18" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M9 18c0-5 6-7 6-12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="15" cy="6" r="2" fill="#00FFC8" />
      </svg>
    );
  }

  // 11. TensorBoard & Evaluation
  if (n.includes("tensorboard")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <rect x="3" y="14" width="4" height="7" rx="1" fill="#FF7043" />
        <rect x="10" y="9" width="4" height="12" rx="1" fill="#FFA726" />
        <rect x="17" y="4" width="4" height="17" rx="1" fill="#FF5722" />
        <path d="M5 12l6-4 6-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 12. RAG Architectures
  if (n.includes("rag")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <path d="M4 6h16M4 12h16M4 18h10" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="18" r="3" fill="#A855F7" />
        <path d="M18 16.5v3M16.5 18h3" stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>
    );
  }

  // 13. LangChain
  if (n.includes("langchain")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <rect width="24" height="24" rx="6" fill="#1C3C3C" />
        <path
          d="M8 8a3 3 0 014-2.8M16 16a3 3 0 01-4 2.8M7 14l10-4"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="14" r="2" fill="#00FFC8" />
        <circle cx="16" cy="10" r="2" fill="#00FFC8" />
      </svg>
    );
  }

  // 14. FAISS & ChromaDB
  if (n.includes("faiss") || n.includes("chroma")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <circle cx="6" cy="6" r="3" fill="#EC4899" />
        <circle cx="18" cy="6" r="3" fill="#8B5CF6" />
        <circle cx="6" cy="18" r="3" fill="#3B82F6" />
        <circle cx="18" cy="18" r="3" fill="#10B981" />
        <path d="M6 9v6M9 6h6M18 9v6M9 18h6" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>
    );
  }

  // 15. Hugging Face Ecosystem
  if (n.includes("hugging face")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#FFD21E">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 7.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S7 11.83 7 11s.67-1.5 1.5-1.5zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3.5 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
      </svg>
    );
  }

  // 16. Prompt Engineering
  if (n.includes("prompt")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#F59E0B" strokeWidth="1.5" />
        <path d="M7 9l3 3-3 3M12 15h5" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 17. GPT, BERT, LLaMA / OpenAI
  if (n.includes("gpt") || n.includes("bert") || n.includes("llama")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#10A37F">
        <path d="M22.28 9.87a5.98 5.98 0 00-.51-4.91 6.05 6.05 0 00-6.51-2.9 6.07 6.07 0 00-4.63-2.06c-2.5 0-4.75 1.5-5.69 3.82a6.03 6.03 0 00-4.14 2.97 6.05 6.05 0 00.83 7.14 6.01 6.01 0 00.51 4.9 6.06 6.06 0 006.52 2.91 6.04 6.04 0 004.62 2.06c2.51 0 4.76-1.5 5.7-3.82a6.04 6.04 0 004.14-2.97 6.05 6.05 0 00-.84-7.14zm-8.8 11.88a4.48 4.48 0 01-3.13-1.32l.14-.08 5.2-3a.78.78 0 00.39-.68v-7.34l2.22 1.28c.02.01.03.03.04.05v6.08a4.52 4.52 0 01-4.86 5.01zm-9.03-4.18a4.49 4.49 0 01-.6-3.35l.14.09 5.2 3a.77.77 0 00.78 0l6.36-3.67v2.56a.08.08 0 01-.04.07l-5.27 3.04a4.52 4.52 0 01-6.57-1.74zm-1.77-9.58a4.49 4.49 0 012.53-2.03v6.18a.78.78 0 00.39.68l6.36 3.67-2.22 1.28a.08.08 0 01-.08 0l-5.27-3.04a4.53 4.53 0 01-1.71-6.74zm15.17 3.12l-6.36-3.67 2.22-1.28c.02-.01.05-.01.08 0l5.27 3.04a4.52 4.52 0 011.71 6.74 4.49 4.49 0 01-2.53 2.03v-6.18a.78.78 0 00-.39-.68zm2.37-3.23l-.14-.08-5.2-3a.77.77 0 00-.78 0L8.88 8.4V5.84c0-.03.02-.05.04-.07l5.27-3.04a4.52 4.52 0 016.57 1.74 4.49 4.49 0 01.6 3.35zm-11.45 4.38l2.9-1.68 2.9 1.68v3.35l-2.9 1.67-2.9-1.67z" />
      </svg>
    );
  }

  // 18. Ollama Local Serving
  if (n.includes("ollama")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <circle cx="12" cy="12" r="9" fill="#FFFFFF" fillOpacity="0.1" stroke="#FFFFFF" strokeWidth="1.5" />
        <ellipse cx="12" cy="13" rx="5" ry="4" fill="#FFFFFF" />
        <circle cx="10" cy="12" r="1" fill="#000000" />
        <circle cx="14" cy="12" r="1" fill="#000000" />
        <path d="M10 7l1 3M14 7l-1 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 19. Streamlit UI
  if (n.includes("streamlit")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#FF4B4B">
        <path d="M16.9 8.2l-3.8-6.1c-.3-.5-1.1-.5-1.4 0L7.9 8.2c-.3.5 0 1.2.6 1.2h7.8c.6 0 .9-.7.6-1.2zm-12 7.7l1.9-3.1c.3-.5 1-.5 1.3 0l1.9 3.1c.3.5 0 1.1-.6 1.1H5.5c-.6 0-.9-.6-.6-1.1zm14.2 0l1.9-3.1c.3-.5 1-.5 1.3 0l1.9 3.1c.3.5 0 1.1-.6 1.1h-3.9c-.6 0-.9-.6-.6-1.1zM12 21.9l-4.8-7.7c-.3-.5 0-1.2.6-1.2h8.4c.6 0 .9.7.6 1.2l-3.6 7.7c-.2.5-1 .5-1.2 0z" />
      </svg>
    );
  }

  // 20. Scikit-learn
  if (n.includes("scikit")) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <circle cx="8" cy="12" r="6" fill="#3499CD" />
        <circle cx="16" cy="12" r="6" fill="#F89939" fillOpacity="0.85" />
      </svg>
    );
  }

  // 21. TensorFlow
  if (n.includes("tensorflow")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#FF6F00">
        <path d="M12 2l9 5.2v5.6l-4-2.3v7.3L12 20.6l-5-2.8v-7.3l-4 2.3V7.2L12 2zm0 3.2L6 8.7v1.8l6-3.5 6 3.5V8.7L12 5.2z" />
      </svg>
    );
  }

  // 22. FastAPI & Flask
  if (n.includes("fastapi") || n.includes("flask")) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <circle cx="12" cy="12" r="10" fill="#009688" />
        <path d="M13 3L6 14h5l-1 7 8-12h-5l1-6z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 23. Java
  if (n.includes("java")) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path
          fill="#5382A1"
          d="M8.8 17.5s-1.2.1-1.7.3c-.6.2-.7.4-.5.6.3.3 1.5.3 2.1.2 1.3-.2 2.6-.4 3.9-.3 1.6.1 3.2.5 4.7.7.5.1 1-.1 1.2-.4.1-.3-.2-.5-.7-.6-1.8-.4-3.7-.6-5.6-.6-.8 0-2.4-.1-3.4.1z"
        />
        <path
          fill="#E76F00"
          d="M14.5 4.5c.5.8.7 1.8.3 2.7-.4.9-1.2 1.6-1.9 2.2-1 .9-2.1 1.7-2.6 3-.4.9-.3 2 .2 2.8.2.3.4.5.7.5.3 0 .4-.3.4-.6 0-.8-.5-1.5-.4-2.3.1-.9.8-1.7 1.6-2.3 1.1-.9 2.3-1.8 2.8-3.1.5-1.3.1-2.8-1.1-2.9z"
        />
      </svg>
    );
  }

  // 24. SQL & Relational DBs
  if (n.includes("sql") || n.includes("relational")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#336791" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#4285F4" strokeWidth="1.5" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#4285F4" strokeWidth="1.5" />
      </svg>
    );
  }

  // 25. HTML / CSS & JavaScript
  if (n.includes("html") || n.includes("javascript") || n.includes("css")) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect x="2" y="3" width="9" height="18" rx="2" fill="#E34F26" />
        <rect x="13" y="3" width="9" height="18" rx="2" fill="#F7DF1E" />
        <path d="M4 8h5M4 12h4M4 16h5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 16c.5.8 1.2 1.2 2 1.2 1 0 1.5-.6 1.5-1.5 0-1-.8-1.4-1.8-1.8l-.5-.2c-1.3-.5-2.2-1.3-2.2-2.7 0-1.8 1.4-3 3.5-3 1.5 0 2.5.6 3.1 1.6l-1.3 1c-.4-.6-1-1-1.8-1s-1.5.5-1.5 1.3c0 .8.6 1.2 1.6 1.6l.5.2c1.6.6 2.5 1.4 2.5 3 0 2-1.6 3.2-3.8 3.2-1.8 0-3-.8-3.7-2l1.4-1.1z" fill="#000000" />
      </svg>
    );
  }

  // 26. CI/CD Pipelines (Jenkins)
  if (n.includes("jenkins") || n.includes("ci/cd")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <circle cx="12" cy="12" r="9" fill="#D24939" fillOpacity="0.2" stroke="#D24939" strokeWidth="1.5" />
        <path d="M8 12l3 3 5-6" stroke="#D24939" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 27. Sonarqube & Quality Assurance
  if (n.includes("sonarqube") || n.includes("quality")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <path d="M4 18a10 10 0 0116 0M7 18a7 7 0 0110 0M10 18a4 4 0 014 0" stroke="#4B9FD5" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  // 28. MLflow Tracking
  if (n.includes("mlflow")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <path d="M12 3l8 14H4L12 3z" stroke="#0194E2" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.5" fill="#0194E2" />
      </svg>
    );
  }

  // 29. Linux Administration
  if (n.includes("linux")) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1.5" />
        <path d="M7 8l4 4-4 4M13 16h4" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Default Fallback Icon
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="8" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

