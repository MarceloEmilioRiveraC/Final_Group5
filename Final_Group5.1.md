Final_Group5
├── .gitignore
├── backend
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── services
│   └── tsconfig.json
├── Final_Group5.md
├── frontend
│   ├── .env
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── app
│   │   │   ├── providers
│   │   │   │   └── provider.ts
│   │   │   └── router
│   │   │       └── router.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── application
│   │   │   ├── posts
│   │   │   │   ├── createPost.ts
│   │   │   │   ├── deletePost.ts
│   │   │   │   ├── getPosts.ts
│   │   │   │   └── likePost.ts
│   │   │   ├── Stats
│   │   │   │   └── getStats.ts
│   │   │   └── users
│   │   │       └── loginUser.ts
│   │   ├── domain
│   │   │   ├── entities
│   │   │   │   ├── Post.ts
│   │   │   │   ├── Stats.ts
│   │   │   │   └── User.ts
│   │   │   ├── repositories
│   │   │   │   ├── IPostRepository.ts
│   │   │   │   └── IUserRepository.ts
│   │   │   └── value-objects
│   │   │       └── val_objs
│   │   ├── index.css
│   │   ├── infrastructure
│   │   │   ├── api
│   │   │   │   └── axiosInstance.ts
│   │   │   ├── repositories
│   │   │   │   ├── PostRepository.ts
│   │   │   │   └── UserRepository.ts
│   │   │   └── services
│   │   │       └── analyticsService.ts
│   │   ├── main.tsx
│   │   ├── presentation
│   │   │   ├── components
│   │   │   │   └── common
│   │   │   │       ├── Buttons.tsx
│   │   │   │       └── Inputs.tsx
│   │   │   ├── hooks
│   │   │   │   └── usePosts.ts
│   │   │   ├── pages
│   │   │   │   └── home.tsx
│   │   │   └── state
│   │   │       └── customStates.ts
│   │   └── shared
│   │       └── utils
│   │           └── utils.tsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── README.md
