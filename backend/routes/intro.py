from fastapi import APIRouter

router = APIRouter(prefix="/about")


# Infobox data for the top-right panel.
@router.get("/profile")
def profile():
    return {
        "name": "Muhammad Mubeen",
        "titles": [
            "Software Engineer",
            "Full Stack Developer",
            "DevOps Enthusiast"
        ],
        "image": "mubeen.jpg",
        "imageCaption": "At Mushkpuri Top",
        "banner": "",
        "facts": [
            {"label": "Born", "value": "22 August 2004"},
            {"label": "Occupation", "value": "Software Engineer"},
            {"label": "Known for", "value": "Full Stack Development, DevOps, AI-powered applications"},
            {"label": "Website", "value": "https://github.com/muhammadMubeen247"},
        ],
    }


# Article body
@router.get("/sections")
def sections():
    return [
        {
            "id": "introduction",
            "title": "Introduction",
            "type": "text",
            "content": (
                "Muhammad Mubeen is a Computer Science graduate from COMSATS University Islamabad, "
                "Lahore Campus, with interests in software engineering, cloud infrastructure, "
                "and DevOps. He enjoys building scalable web applications using modern backend "
                "frameworks, containerization technologies, and cloud platforms. His work ranges "
                "from real-time social platforms to AI-powered educational systems that leverage "
                "Retrieval-Augmented Generation (RAG)."
            ),
        },
        {
            "id": "focus-areas",
            "title": "Focus Areas",
            "type": "list",
            "items": [
                "Full Stack Web Development",
                "Backend Engineering",
                "Cloud Computing",
                "DevOps & CI/CD",
                "Containerization with Docker",
                "Kubernetes",
                "REST API Development",
                "System Design",
                "Artificial Intelligence & Retrieval-Augmented Generation (RAG)",
            ],
        },
        {
            "id": "technologies",
            "title": "Technologies",
            "type": "list",
            "items": [
                "Python",
                "FastAPI",
                "JavaScript",
                "React",
                "Next.js",
                "Node.js",
                "Express.js",
                "PostgreSQL",
                "MongoDB",
                "Neo4j",
                "Docker",
                "Git",
                "GitHub Actions",
                "AWS",
                "Linux",
                "Bash",
                "Nginx",
                "Cloudflare",
            ],
        },
        {
            "id": "projects",
            "title": "Projects",
            "type": "projects",
            "items": [
                {
                    "id": "the-learning-sampai",
                    "name": "The Learning SAMpai",
                    "description": "An AI-powered learning platform developed as my Final Year Project. "
                "The application allows instructors to upload lecture materials, "
                "including PDFs, PowerPoint presentations, and Word documents, "
                "which students can then query using natural language. Built on a "
                "Retrieval-Augmented Generation (RAG) architecture powered by "
                "LightRAG, it combines vector search with knowledge graphs to "
                "deliver accurate, context-aware responses. The platform also "
                "generates quizzes, flashcards, and mind maps from course content "
                "to enhance the learning experience. The project was developed "
                "using React, FastAPI, PostgreSQL, Neo4j, Qdrant, Docker, and "
                "deployed with Cloudflare Tunnel.",
                    "images": ["/sampai/screenshot1.jpeg","/sampai/screenshot2.jpeg",
                               "/sampai/screenshot3.jpeg","/sampai/screenshot4.jpeg",
                               "/sampai/screenshot5.jpeg","/sampai/screenshot6.jpeg",
                               "/sampai/screenshot7.jpeg"],
                },
                {
                    "id": "personas",
                    "name": "Personas",
                    "description": "A full-stack social media platform designed exclusively for the "
                "COMSATS Lahore community. Personas enables students to create "
                "both public and anonymous identities, publish posts, interact "
                "through comments and likes, and communicate via real-time direct "
                "messaging. The platform includes thread sharing, suggested users, "
                "notifications, authentication, and a modern responsive interface. "
                "Built with the MERN stack, it focuses on creating a secure and "
                "engaging campus-wide social networking experience.",
                    "images": ["/personas/screenshot1.png","/personas/screenshot2.png",
                               "/personas/screenshot3.png","/personas/screenshot4.png",],
                },
            ],
        },
        {
            "id": "interests",
            "title": "Interests",
            "type": "list",
            "items": [
                "Cloud Infrastructure",
                "DevOps",
                "Backend Development",
                "Distributed Systems",
                "Open Source",
                "Linux",
                "System Architecture",
                "Artificial Intelligence",
                "Learning new technologies",
            ],
        },
        {
            "id": "contact",
            "title": "Contact",
            "type": "contact",
            "items": [
                {"label": "Email", "value": "mubeenlive247@gmail.com", "href": "mailto:mubeenlive247@gmail.com"},
                {"label": "LinkedIn", "value": "muhammadMubeen", "href": "https://www.linkedin.com/in/muhammad-mubeen247"},
            ],
        },
    ]