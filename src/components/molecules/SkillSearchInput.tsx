"use client";

import * as React from "react";
import { Search, Plus, X } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";

// Master skill list with display names and Simple Icons CDN slugs
// Sourced from Simple Icons (3,400+ icons) — https://simpleicons.org
const ALL_SKILLS: { name: string; slug: string; category: string }[] = [
  // ── JavaScript Ecosystem ──
  { name: "JavaScript", slug: "javascript", category: "Languages" },
  { name: "TypeScript", slug: "typescript", category: "Languages" },
  { name: "React", slug: "react", category: "Frontend" },
  { name: "Next.js", slug: "nextdotjs", category: "Frontend" },
  { name: "Vue.js", slug: "vuedotjs", category: "Frontend" },
  { name: "Nuxt.js", slug: "nuxtdotjs", category: "Frontend" },
  { name: "Angular", slug: "angular", category: "Frontend" },
  { name: "Svelte", slug: "svelte", category: "Frontend" },
  { name: "SvelteKit", slug: "svelte", category: "Frontend" },
  { name: "Solid.js", slug: "solid", category: "Frontend" },
  { name: "Qwik", slug: "qwik", category: "Frontend" },
  { name: "Preact", slug: "preact", category: "Frontend" },
  { name: "Astro", slug: "astro", category: "Frontend" },
  { name: "Remix", slug: "remix", category: "Frontend" },
  { name: "Gatsby", slug: "gatsby", category: "Frontend" },
  { name: "Node.js", slug: "nodedotjs", category: "Backend" },
  { name: "Express", slug: "express", category: "Backend" },
  { name: "NestJS", slug: "nestjs", category: "Backend" },
  { name: "Fastify", slug: "fastify", category: "Backend" },
  { name: "Hono", slug: "hono", category: "Backend" },
  { name: "Deno", slug: "deno", category: "Backend" },
  { name: "Bun", slug: "bun", category: "Backend" },
  { name: "jQuery", slug: "jquery", category: "Frontend" },
  { name: "Redux", slug: "redux", category: "Frontend" },
  { name: "Zustand", slug: "zustand", category: "Frontend" },
  { name: "MobX", slug: "mobx", category: "Frontend" },
  { name: "Recoil", slug: "recoil", category: "Frontend" },
  { name: "Three.js", slug: "threedotjs", category: "Frontend" },
  { name: "D3.js", slug: "d3dotjs", category: "Frontend" },
  { name: "Chart.js", slug: "chartdotjs", category: "Frontend" },
  { name: "Electron", slug: "electron", category: "Desktop" },
  { name: "Tauri", slug: "tauri", category: "Desktop" },
  { name: "React Native", slug: "react", category: "Mobile" },
  { name: "Expo", slug: "expo", category: "Mobile" },
  { name: "Socket.IO", slug: "socketdotio", category: "Backend" },
  { name: "Framer Motion", slug: "framer", category: "Frontend" },
  { name: "Anime.js", slug: "animedotjs", category: "Frontend" },
  { name: "GSAP", slug: "greensock", category: "Frontend" },
  { name: "Axios", slug: "axios", category: "Frontend" },
  { name: "tRPC", slug: "trpc", category: "Backend" },
  { name: "Prisma", slug: "prisma", category: "Database" },
  { name: "Drizzle", slug: "drizzle", category: "Database" },
  { name: "Zod", slug: "zod", category: "Tools" },

  // ── CSS & Styling ──
  { name: "HTML", slug: "html5", category: "Frontend" },
  { name: "CSS", slug: "css3", category: "Frontend" },
  { name: "Sass", slug: "sass", category: "Frontend" },
  { name: "Less", slug: "less", category: "Frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", category: "Frontend" },
  { name: "Bootstrap", slug: "bootstrap", category: "Frontend" },
  { name: "Material UI", slug: "mui", category: "Frontend" },
  { name: "Chakra UI", slug: "chakraui", category: "Frontend" },
  { name: "Ant Design", slug: "antdesign", category: "Frontend" },
  { name: "Radix UI", slug: "radixui", category: "Frontend" },
  { name: "Styled Components", slug: "styledcomponents", category: "Frontend" },
  { name: "shadcn/ui", slug: "shadcnui", category: "Frontend" },
  { name: "daisyUI", slug: "daisyui", category: "Frontend" },
  { name: "Bulma", slug: "bulma", category: "Frontend" },
  { name: "Headless UI", slug: "headlessui", category: "Frontend" },
  { name: "CSS Modules", slug: "cssmodules", category: "Frontend" },
  { name: "PostCSS", slug: "postcss", category: "Frontend" },
  { name: "Storybook", slug: "storybook", category: "Frontend" },

  // ── Programming Languages ──
  { name: "Python", slug: "python", category: "Languages" },
  { name: "Java", slug: "java", category: "Languages" },
  { name: "C#", slug: "csharp", category: "Languages" },
  { name: "C++", slug: "cplusplus", category: "Languages" },
  { name: "C", slug: "c", category: "Languages" },
  { name: "Go", slug: "go", category: "Languages" },
  { name: "Rust", slug: "rust", category: "Languages" },
  { name: "Ruby", slug: "ruby", category: "Languages" },
  { name: "PHP", slug: "php", category: "Languages" },
  { name: "Swift", slug: "swift", category: "Languages" },
  { name: "Kotlin", slug: "kotlin", category: "Languages" },
  { name: "Dart", slug: "dart", category: "Languages" },
  { name: "R", slug: "r", category: "Languages" },
  { name: "Scala", slug: "scala", category: "Languages" },
  { name: "Elixir", slug: "elixir", category: "Languages" },
  { name: "Haskell", slug: "haskell", category: "Languages" },
  { name: "Lua", slug: "lua", category: "Languages" },
  { name: "Perl", slug: "perl", category: "Languages" },
  { name: "Clojure", slug: "clojure", category: "Languages" },
  { name: "Solidity", slug: "solidity", category: "Languages" },
  { name: "MATLAB", slug: "matlab", category: "Languages" },
  { name: "Assembly", slug: "assemblyscript", category: "Languages" },
  { name: "Zig", slug: "zig", category: "Languages" },
  { name: "Nim", slug: "nim", category: "Languages" },
  { name: "Crystal", slug: "crystal", category: "Languages" },
  { name: "Julia", slug: "julia", category: "Languages" },
  { name: "Erlang", slug: "erlang", category: "Languages" },
  { name: "F#", slug: "fsharp", category: "Languages" },
  { name: "OCaml", slug: "ocaml", category: "Languages" },
  { name: "Fortran", slug: "fortran", category: "Languages" },
  { name: "Groovy", slug: "apachegroovy", category: "Languages" },
  { name: "V", slug: "v", category: "Languages" },
  { name: "CoffeeScript", slug: "coffeescript", category: "Languages" },
  { name: "PowerShell", slug: "powershell", category: "Languages" },
  { name: "Bash", slug: "gnubash", category: "Languages" },
  { name: "SQL", slug: "sql", category: "Languages" },
  { name: "GraphQL", slug: "graphql", category: "Languages" },

  // ── Backend Frameworks ──
  { name: "Django", slug: "django", category: "Backend" },
  { name: "Flask", slug: "flask", category: "Backend" },
  { name: "FastAPI", slug: "fastapi", category: "Backend" },
  { name: "Spring Boot", slug: "springboot", category: "Backend" },
  { name: "Spring", slug: "spring", category: "Backend" },
  { name: "Laravel", slug: "laravel", category: "Backend" },
  { name: "Symfony", slug: "symfony", category: "Backend" },
  { name: "Ruby on Rails", slug: "rubyonrails", category: "Backend" },
  { name: ".NET", slug: "dotnet", category: "Backend" },
  { name: "ASP.NET", slug: "dotnet", category: "Backend" },
  { name: "Blazor", slug: "blazor", category: "Backend" },
  { name: "Gin", slug: "gin", category: "Backend" },
  { name: "Fiber", slug: "fiber", category: "Backend" },
  { name: "Echo", slug: "echo", category: "Backend" },
  { name: "Phoenix", slug: "phoenixframework", category: "Backend" },
  { name: "Actix", slug: "actix", category: "Backend" },
  { name: "AdonisJS", slug: "adonisjs", category: "Backend" },
  { name: "Strapi", slug: "strapi", category: "CMS" },
  { name: "gRPC", slug: "grpc", category: "Backend" },
  { name: "Apache Kafka", slug: "apachekafka", category: "Backend" },
  { name: "RabbitMQ", slug: "rabbitmq", category: "Backend" },
  { name: "Celery", slug: "celery", category: "Backend" },
  { name: "Nginx", slug: "nginx", category: "Backend" },
  { name: "Apache", slug: "apache", category: "Backend" },
  { name: "Caddy", slug: "caddy", category: "Backend" },

  // ── Databases ──
  { name: "MongoDB", slug: "mongodb", category: "Database" },
  { name: "PostgreSQL", slug: "postgresql", category: "Database" },
  { name: "MySQL", slug: "mysql", category: "Database" },
  { name: "MariaDB", slug: "mariadb", category: "Database" },
  { name: "SQLite", slug: "sqlite", category: "Database" },
  { name: "Redis", slug: "redis", category: "Database" },
  { name: "Elasticsearch", slug: "elasticsearch", category: "Database" },
  { name: "Firebase", slug: "firebase", category: "Database" },
  { name: "Supabase", slug: "supabase", category: "Database" },
  { name: "DynamoDB", slug: "amazondynamodb", category: "Database" },
  { name: "Neo4j", slug: "neo4j", category: "Database" },
  { name: "Cassandra", slug: "apachecassandra", category: "Database" },
  { name: "CouchDB", slug: "apachecouchdb", category: "Database" },
  { name: "InfluxDB", slug: "influxdb", category: "Database" },
  { name: "CockroachDB", slug: "cockroachlabs", category: "Database" },
  { name: "ArangoDB", slug: "arangodb", category: "Database" },
  { name: "Couchbase", slug: "couchbase", category: "Database" },
  { name: "PlanetScale", slug: "planetscale", category: "Database" },
  { name: "Neon", slug: "neon", category: "Database" },
  { name: "Mongoose", slug: "mongoose", category: "Database" },
  { name: "Sequelize", slug: "sequelize", category: "Database" },
  { name: "TypeORM", slug: "typeorm", category: "Database" },
  { name: "Convex", slug: "convex", category: "Database" },
  { name: "Appwrite", slug: "appwrite", category: "Database" },
  { name: "ClickHouse", slug: "clickhouse", category: "Database" },

  // ── Cloud & Infrastructure ──
  { name: "AWS", slug: "amazonaws", category: "Cloud" },
  { name: "Azure", slug: "microsoftazure", category: "Cloud" },
  { name: "Google Cloud", slug: "googlecloud", category: "Cloud" },
  { name: "Vercel", slug: "vercel", category: "Cloud" },
  { name: "Netlify", slug: "netlify", category: "Cloud" },
  { name: "Heroku", slug: "heroku", category: "Cloud" },
  { name: "DigitalOcean", slug: "digitalocean", category: "Cloud" },
  { name: "Cloudflare", slug: "cloudflare", category: "Cloud" },
  { name: "Cloudflare Workers", slug: "cloudflareworkers", category: "Cloud" },
  { name: "Railway", slug: "railway", category: "Cloud" },
  { name: "Render", slug: "render", category: "Cloud" },
  { name: "Fly.io", slug: "flydotio", category: "Cloud" },
  { name: "Linode", slug: "linode", category: "Cloud" },
  { name: "Vultr", slug: "vultr", category: "Cloud" },
  { name: "Oracle Cloud", slug: "oracle", category: "Cloud" },
  { name: "Alibaba Cloud", slug: "alibabacloud", category: "Cloud" },
  { name: "Hetzner", slug: "hetzner", category: "Cloud" },
  { name: "Coolify", slug: "coolify", category: "Cloud" },
  { name: "PocketBase", slug: "pocketbase", category: "Cloud" },

  // ── DevOps & CI/CD ──
  { name: "Docker", slug: "docker", category: "DevOps" },
  { name: "Kubernetes", slug: "kubernetes", category: "DevOps" },
  { name: "Terraform", slug: "terraform", category: "DevOps" },
  { name: "Ansible", slug: "ansible", category: "DevOps" },
  { name: "Pulumi", slug: "pulumi", category: "DevOps" },
  { name: "Helm", slug: "helm", category: "DevOps" },
  { name: "Jenkins", slug: "jenkins", category: "DevOps" },
  { name: "GitHub Actions", slug: "githubactions", category: "DevOps" },
  { name: "GitLab CI", slug: "gitlab", category: "DevOps" },
  { name: "CircleCI", slug: "circleci", category: "DevOps" },
  { name: "Travis CI", slug: "travisci", category: "DevOps" },
  { name: "ArgoCD", slug: "argo", category: "DevOps" },
  { name: "Grafana", slug: "grafana", category: "DevOps" },
  { name: "Prometheus", slug: "prometheus", category: "DevOps" },
  { name: "Datadog", slug: "datadog", category: "DevOps" },
  { name: "New Relic", slug: "newrelic", category: "DevOps" },
  { name: "Sentry", slug: "sentry", category: "DevOps" },
  { name: "Linux", slug: "linux", category: "DevOps" },
  { name: "Ubuntu", slug: "ubuntu", category: "DevOps" },
  { name: "Debian", slug: "debian", category: "DevOps" },
  { name: "CentOS", slug: "centos", category: "DevOps" },
  { name: "Alpine Linux", slug: "alpinelinux", category: "DevOps" },
  { name: "Vagrant", slug: "vagrant", category: "DevOps" },
  { name: "Podman", slug: "podman", category: "DevOps" },
  { name: "containerd", slug: "containerd", category: "DevOps" },
  { name: "Istio", slug: "istio", category: "DevOps" },
  { name: "Consul", slug: "consul", category: "DevOps" },
  { name: "Vault", slug: "vault", category: "DevOps" },
  { name: "Packer", slug: "packer", category: "DevOps" },

  // ── Tools & Editors ──
  { name: "Git", slug: "git", category: "Tools" },
  { name: "GitHub", slug: "github", category: "Tools" },
  { name: "GitLab", slug: "gitlab", category: "Tools" },
  { name: "Bitbucket", slug: "bitbucket", category: "Tools" },
  { name: "VS Code", slug: "visualstudiocode", category: "Tools" },
  { name: "IntelliJ IDEA", slug: "intellijidea", category: "Tools" },
  { name: "WebStorm", slug: "webstorm", category: "Tools" },
  { name: "PyCharm", slug: "pycharm", category: "Tools" },
  { name: "Android Studio", slug: "androidstudio", category: "Tools" },
  { name: "Xcode", slug: "xcode", category: "Tools" },
  { name: "Visual Studio", slug: "visualstudio", category: "Tools" },
  { name: "Neovim", slug: "neovim", category: "Tools" },
  { name: "Vim", slug: "vim", category: "Tools" },
  { name: "Sublime Text", slug: "sublimetext", category: "Tools" },
  { name: "Cursor", slug: "cursor", category: "Tools" },
  { name: "Postman", slug: "postman", category: "Tools" },
  { name: "Insomnia", slug: "insomnia", category: "Tools" },
  { name: "Bruno", slug: "bruno", category: "Tools" },
  { name: "Figma", slug: "figma", category: "Tools" },
  { name: "Jira", slug: "jira", category: "Tools" },
  { name: "Confluence", slug: "confluence", category: "Tools" },
  { name: "Notion", slug: "notion", category: "Tools" },
  { name: "Linear", slug: "linear", category: "Tools" },
  { name: "Slack", slug: "slack", category: "Tools" },
  { name: "Discord", slug: "discord", category: "Tools" },
  { name: "Webpack", slug: "webpack", category: "Tools" },
  { name: "Vite", slug: "vite", category: "Tools" },
  { name: "Rollup", slug: "rollupdotjs", category: "Tools" },
  { name: "esbuild", slug: "esbuild", category: "Tools" },
  { name: "SWC", slug: "swc", category: "Tools" },
  { name: "Turbopack", slug: "turbopack", category: "Tools" },
  { name: "ESLint", slug: "eslint", category: "Tools" },
  { name: "Prettier", slug: "prettier", category: "Tools" },
  { name: "Biome", slug: "biomejs", category: "Tools" },
  { name: "npm", slug: "npm", category: "Tools" },
  { name: "Yarn", slug: "yarn", category: "Tools" },
  { name: "pnpm", slug: "pnpm", category: "Tools" },
  { name: "Homebrew", slug: "homebrew", category: "Tools" },
  { name: "Warp", slug: "warp", category: "Tools" },
  { name: "iTerm2", slug: "iterm2", category: "Tools" },
  { name: "tmux", slug: "tmux", category: "Tools" },

  // ── Testing ──
  { name: "Jest", slug: "jest", category: "Testing" },
  { name: "Vitest", slug: "vitest", category: "Testing" },
  { name: "Cypress", slug: "cypress", category: "Testing" },
  { name: "Playwright", slug: "playwright", category: "Testing" },
  { name: "Selenium", slug: "selenium", category: "Testing" },
  { name: "Puppeteer", slug: "puppeteer", category: "Testing" },
  { name: "Testing Library", slug: "testinglibrary", category: "Testing" },
  { name: "Mocha", slug: "mocha", category: "Testing" },
  { name: "Chai", slug: "chai", category: "Testing" },
  { name: "pytest", slug: "pytest", category: "Testing" },
  { name: "JUnit", slug: "junit5", category: "Testing" },
  { name: "Appium", slug: "appium", category: "Testing" },
  { name: "k6", slug: "k6", category: "Testing" },
  { name: "Cucumber", slug: "cucumber", category: "Testing" },
  { name: "SonarQube", slug: "sonarqube", category: "Testing" },
  { name: "Codecov", slug: "codecov", category: "Testing" },

  // ── Mobile ──
  { name: "Flutter", slug: "flutter", category: "Mobile" },
  { name: "Android", slug: "android", category: "Mobile" },
  { name: "iOS", slug: "ios", category: "Mobile" },
  { name: "Ionic", slug: "ionic", category: "Mobile" },
  { name: "Capacitor", slug: "capacitor", category: "Mobile" },
  { name: "Xamarin", slug: "xamarin", category: "Mobile" },
  { name: "SwiftUI", slug: "swift", category: "Mobile" },
  { name: "Jetpack Compose", slug: "jetpackcompose", category: "Mobile" },
  { name: "PWA", slug: "pwa", category: "Mobile" },

  // ── AI / ML / Data ──
  { name: "TensorFlow", slug: "tensorflow", category: "AI/ML" },
  { name: "PyTorch", slug: "pytorch", category: "AI/ML" },
  { name: "Pandas", slug: "pandas", category: "AI/ML" },
  { name: "NumPy", slug: "numpy", category: "AI/ML" },
  { name: "Scikit-learn", slug: "scikitlearn", category: "AI/ML" },
  { name: "OpenAI", slug: "openai", category: "AI/ML" },
  { name: "Anthropic", slug: "anthropic", category: "AI/ML" },
  { name: "Google Gemini", slug: "googlegemini", category: "AI/ML" },
  { name: "Hugging Face", slug: "huggingface", category: "AI/ML" },
  { name: "LangChain", slug: "langchain", category: "AI/ML" },
  { name: "Ollama", slug: "ollama", category: "AI/ML" },
  { name: "Jupyter", slug: "jupyter", category: "AI/ML" },
  { name: "Keras", slug: "keras", category: "AI/ML" },
  { name: "OpenCV", slug: "opencv", category: "AI/ML" },
  { name: "Apache Spark", slug: "apachespark", category: "AI/ML" },
  { name: "Matplotlib", slug: "matplotlib", category: "AI/ML" },
  { name: "Plotly", slug: "plotly", category: "AI/ML" },
  { name: "MLflow", slug: "mlflow", category: "AI/ML" },
  { name: "ONNX", slug: "onnx", category: "AI/ML" },
  { name: "Weights & Biases", slug: "weightsandbiases", category: "AI/ML" },
  { name: "Colab", slug: "googlecolab", category: "AI/ML" },
  { name: "Kaggle", slug: "kaggle", category: "AI/ML" },
  { name: "Dask", slug: "dask", category: "AI/ML" },
  { name: "Airflow", slug: "apacheairflow", category: "AI/ML" },
  { name: "Streamlit", slug: "streamlit", category: "AI/ML" },
  { name: "Gradio", slug: "gradio", category: "AI/ML" },

  // ── CMS & eCommerce ──
  { name: "WordPress", slug: "wordpress", category: "CMS" },
  { name: "Shopify", slug: "shopify", category: "CMS" },
  { name: "Sanity", slug: "sanity", category: "CMS" },
  { name: "Contentful", slug: "contentful", category: "CMS" },
  { name: "Ghost", slug: "ghost", category: "CMS" },
  { name: "Directus", slug: "directus", category: "CMS" },
  { name: "Payload CMS", slug: "payloadcms", category: "CMS" },
  { name: "Drupal", slug: "drupal", category: "CMS" },
  { name: "WooCommerce", slug: "woocommerce", category: "CMS" },
  { name: "Magento", slug: "magento", category: "CMS" },
  { name: "Medusa", slug: "medusa", category: "CMS" },
  { name: "PrestaShop", slug: "prestashop", category: "CMS" },
  { name: "Webflow", slug: "webflow", category: "CMS" },
  { name: "Wix", slug: "wix", category: "CMS" },
  { name: "Squarespace", slug: "squarespace", category: "CMS" },

  // ── Services & APIs ──
  { name: "Stripe", slug: "stripe", category: "Services" },
  { name: "PayPal", slug: "paypal", category: "Services" },
  { name: "Auth0", slug: "auth0", category: "Services" },
  { name: "Clerk", slug: "clerk", category: "Services" },
  { name: "Okta", slug: "okta", category: "Services" },
  { name: "Twilio", slug: "twilio", category: "Services" },
  { name: "SendGrid", slug: "sendgrid", category: "Services" },
  { name: "Resend", slug: "resend", category: "Services" },
  { name: "Algolia", slug: "algolia", category: "Services" },
  { name: "Cloudinary", slug: "cloudinary", category: "Services" },
  { name: "Mapbox", slug: "mapbox", category: "Services" },
  { name: "Google Maps", slug: "googlemaps", category: "Services" },
  { name: "OpenStreetMap", slug: "openstreetmap", category: "Services" },
  { name: "Google Analytics", slug: "googleanalytics", category: "Services" },
  { name: "Mixpanel", slug: "mixpanel", category: "Services" },
  { name: "Amplitude", slug: "amplitude", category: "Services" },
  { name: "Segment", slug: "segment", category: "Services" },
  { name: "PostHog", slug: "posthog", category: "Services" },
  { name: "LaunchDarkly", slug: "launchdarkly", category: "Services" },
  { name: "Plaid", slug: "plaid", category: "Services" },

  // ── Web3 / Blockchain ──
  { name: "Ethereum", slug: "ethereum", category: "Web3" },
  { name: "Bitcoin", slug: "bitcoin", category: "Web3" },
  { name: "Web3.js", slug: "web3dotjs", category: "Web3" },
  { name: "Ethers.js", slug: "ethersdotjs", category: "Web3" },
  { name: "Polygon", slug: "polygon", category: "Web3" },
  { name: "Chainlink", slug: "chainlink", category: "Web3" },
  { name: "IPFS", slug: "ipfs", category: "Web3" },
  { name: "Hardhat", slug: "hardhat", category: "Web3" },
  { name: "OpenZeppelin", slug: "openzeppelin", category: "Web3" },

  // ── Design ──
  { name: "Photoshop", slug: "adobephotoshop", category: "Design" },
  { name: "Illustrator", slug: "adobeillustrator", category: "Design" },
  { name: "Adobe XD", slug: "adobexd", category: "Design" },
  { name: "After Effects", slug: "adobeaftereffects", category: "Design" },
  { name: "Premiere Pro", slug: "adobepremierepro", category: "Design" },
  { name: "InDesign", slug: "adobeindesign", category: "Design" },
  { name: "Lightroom", slug: "adobelightroom", category: "Design" },
  { name: "Sketch", slug: "sketch", category: "Design" },
  { name: "Blender", slug: "blender", category: "Design" },
  { name: "Cinema 4D", slug: "cinema4d", category: "Design" },
  { name: "Canva", slug: "canva", category: "Design" },
  { name: "Framer", slug: "framer", category: "Design" },
  { name: "InVision", slug: "invision", category: "Design" },
  { name: "Zeplin", slug: "zeplin", category: "Design" },
  { name: "Penpot", slug: "penpot", category: "Design" },
  { name: "DaVinci Resolve", slug: "davinciresolve", category: "Design" },

  // ── Game Development ──
  { name: "Unity", slug: "unity", category: "GameDev" },
  { name: "Unreal Engine", slug: "unrealengine", category: "GameDev" },
  { name: "Godot", slug: "godotengine", category: "GameDev" },
  { name: "Pygame", slug: "pygame", category: "GameDev" },
  { name: "Roblox", slug: "roblox", category: "GameDev" },
  { name: "Steam", slug: "steam", category: "GameDev" },

  // ── Security ──
  { name: "Let's Encrypt", slug: "letsencrypt", category: "Security" },
  { name: "OWASP", slug: "owasp", category: "Security" },
  { name: "Snyk", slug: "snyk", category: "Security" },
  { name: "1Password", slug: "1password", category: "Security" },
  { name: "Bitwarden", slug: "bitwarden", category: "Security" },
  { name: "WireGuard", slug: "wireguard", category: "Security" },
  { name: "Tor", slug: "torproject", category: "Security" },
  { name: "Burp Suite", slug: "burpsuite", category: "Security" },
  { name: "Kali Linux", slug: "kalilinux", category: "Security" },

  // ── Automation & Low-Code ──
  { name: "n8n", slug: "n8n", category: "Automation" },
  { name: "Zapier", slug: "zapier", category: "Automation" },
  { name: "Make", slug: "make", category: "Automation" },
  { name: "Power Automate", slug: "powerautomate", category: "Automation" },
  { name: "Retool", slug: "retool", category: "Automation" },
  { name: "Temporal", slug: "temporal", category: "Automation" },

  // ── Operating Systems ──
  { name: "Windows", slug: "windows", category: "OS" },
  { name: "macOS", slug: "macos", category: "OS" },
  { name: "Arch Linux", slug: "archlinux", category: "OS" },
  { name: "Fedora", slug: "fedora", category: "OS" },
  { name: "Red Hat", slug: "redhat", category: "OS" },
  { name: "FreeBSD", slug: "freebsd", category: "OS" },
  { name: "NixOS", slug: "nixos", category: "OS" },

  // ── Networking & Protocols ──
  { name: "Cisco", slug: "cisco", category: "Networking" },
  { name: "Wireshark", slug: "wireshark", category: "Networking" },
  { name: "MQTT", slug: "mqtt", category: "Networking" },
  { name: "WebRTC", slug: "webrtc", category: "Networking" },
  { name: "WebSocket", slug: "websocket", category: "Networking" },

  // ── IoT & Embedded ──
  { name: "Arduino", slug: "arduino", category: "IoT" },
  { name: "Raspberry Pi", slug: "raspberrypi", category: "IoT" },
  { name: "ESP32", slug: "esphome", category: "IoT" },
  { name: "Home Assistant", slug: "homeassistant", category: "IoT" },

  // ── Learning & Community ──
  { name: "Stack Overflow", slug: "stackoverflow", category: "Community" },
  { name: "LeetCode", slug: "leetcode", category: "Community" },
  { name: "HackerRank", slug: "hackerrank", category: "Community" },
  { name: "Codeforces", slug: "codeforces", category: "Community" },
  { name: "Coursera", slug: "coursera", category: "Community" },
  { name: "Udemy", slug: "udemy", category: "Community" },
  { name: "freeCodeCamp", slug: "freecodecamp", category: "Community" },
  { name: "Dev.to", slug: "devdotto", category: "Community" },
  { name: "Medium", slug: "medium", category: "Community" },
  { name: "Hashnode", slug: "hashnode", category: "Community" },
];

export function getSlugForSkill(skillName: string): string {
  const found = ALL_SKILLS.find(s => s.name.toLowerCase() === skillName.toLowerCase());
  if (found) return found.slug;
  // Fallback normalization
  return skillName.toLowerCase().replace(/\./g, "dot").replace(/\s+/g, "").replace(/\+/g, "plus").replace(/#/g, "sharp");
}

// theSVG CDN uses different slugs for some icons — map them here
const THESVG_SLUG_OVERRIDES: Record<string, string> = {
  "radixui": "radix-ui",
  "headlessui": "headless-ui",
  "cssmodules": "css-modules",
  "gnubash": "gnu-bash",
  "biomejs": "biomejs",
  "fiber": "fiber",
  "neon": "neon",
  "pulumi": "pulumi",
  "podman": "podman",
  "neovim": "neovim",
  "containerd": "containerd",
  "consul": "consul",
  "vault": "vault",
  "k6": "k6",
  "capacitor": "capacitor",
  "planetscale": "planetscale",
  "typeorm": "typeorm",
  "convex": "convex",
  "istio": "istio",
  "temporal": "temporal",
  "daisyui": "daisyui",
  "hackerrank": "hackerrank",
};

// Reusable icon with multi-CDN fallback
export function SkillIcon({ name, size = 14, color, variant }: { name: string; size?: number; color?: string; variant?: "default" | "light" | "mono" | "dark" }) {
  const slug = getSlugForSkill(name);
  const altSlug = THESVG_SLUG_OVERRIDES[slug];
  
  const [stage, setStage] = React.useState<number>(0);
  const [hasFailed, setHasFailed] = React.useState(false);

  const sources = React.useMemo(() => {
    const s: string[] = [];
    const cleanColor = color?.replace('#', '');
    const theSvgVariant = variant || "default";

    // Always prioritize Simple Icons because it strictly returns 404s for missing icons.
    // theSVG can sometimes return a 200 OK HTTP response with a placeholder image, which breaks the onError fallback chain.
    if (cleanColor) {
      s.push(`https://cdn.simpleicons.org/${slug}/${cleanColor}`);
    } else {
      s.push(`https://cdn.simpleicons.org/${slug}`);
    }
    
    // Fallback to theSVG
    s.push(`https://thesvg.org/icons/${slug}/${theSvgVariant}.svg`);
    if (altSlug && altSlug !== slug) {
      s.push(`https://thesvg.org/icons/${altSlug}/${theSvgVariant}.svg`);
    }
    
    return s;
  }, [slug, altSlug, variant, color]);

  const handleError = () => {
    if (stage < sources.length - 1) {
      setStage(prev => prev + 1);
    } else {
      setHasFailed(true);
    }
  };

  if (hasFailed || stage >= sources.length) {
    // All sources failed — show letter fallback
    return (
      <span
        className="inline-flex items-center justify-center rounded-sm font-bold flex-shrink-0"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.65,
          background: color ? `#${color.replace('#', '')}25` : "hsl(var(--muted))",
          color: color ? `#${color.replace('#', '')}` : "hsl(var(--muted-foreground))",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={`${name}-${stage}`} // Ensure fresh DOM node on fallback
      src={sources[stage]}
      alt=""
      width={size}
      height={size}
      className="flex-shrink-0"
      onError={handleError}
    />
  );
}

interface SkillSearchInputProps {
  selectedSkills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}

export function SkillSearchInput({ selectedSkills, onAdd, onRemove }: SkillSearchInputProps) {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredSkills = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    const available = ALL_SKILLS.filter(
      s => !selectedSkills.some(sel => sel.toLowerCase() === s.name.toLowerCase())
    );
    if (!q) return available.slice(0, 30); // Show first 30 when no query
    return available.filter(
      s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    ).slice(0, 50);
  }, [query, selectedSkills]);

  const isCustomSkill = query.trim().length > 0 &&
    !ALL_SKILLS.some(s => s.name.toLowerCase() === query.trim().toLowerCase()) &&
    !selectedSkills.some(s => s.toLowerCase() === query.trim().toLowerCase());

  const handleSelect = (skillName: string) => {
    onAdd(skillName);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSkills.length > 0) {
        handleSelect(filteredSkills[0].name);
      } else if (isCustomSkill) {
        handleSelect(query.trim());
      }
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search skills... (e.g., React, Python, Docker)"
          className="w-full h-10 pl-9 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />

        {/* Dropdown */}
        {isOpen && (query || filteredSkills.length > 0) && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-64 overflow-auto rounded-lg border border-border bg-background shadow-xl">
            {filteredSkills.map((skill) => (
              <button
                key={skill.name}
                type="button"
                onClick={() => handleSelect(skill.name)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/70 transition-colors text-left"
              >
                <SkillIcon name={skill.name} size={20} />
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{skill.category}</span>
              </button>
            ))}

            {/* Custom skill option */}
            {isCustomSkill && (
              <button
                type="button"
                onClick={() => handleSelect(query.trim())}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/70 transition-colors text-left border-t border-border"
              >
                <Plus className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">
                  Add <strong>&quot;{query.trim()}&quot;</strong> as custom skill
                </span>
              </button>
            )}

            {filteredSkills.length === 0 && !isCustomSkill && (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                No skills found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => {
            return (
              <Badge
                key={skill}
                variant="secondary"
                removable
                onRemove={() => onRemove(skill)}
                className="flex items-center gap-1.5 pr-1"
              >
                <SkillIcon name={skill} size={14} />
                {skill}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
