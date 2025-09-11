// Sample data for posts
export const samplePosts = [
  {
    id: 1,
    author: {
      name: "Sebastien Castiel",
      profileImage: "/assets/profile1.jpeg",
      username: "sebastiencastiel"
    },
    date: "Sep 3",
    title: "Seven Hours, Zero Internet, and Local AI Coding at 40,000 Feet",
    image: "/assets/imagepost.png",
    tags: [
      { name: "programming", color: "purple" },
      { name: "ai", color: "blue" },
      { name: "vibecoding", color: "green" }
    ],
    reactions: {
      count: 51,
      types: ["❤️", "🦄", "🔥"]
    },
    comments: 9,
    readTime: "5 min read",
    hasImage: true
  },
  {
    id: 2,
    author: {
      name: "Ashley Childress",
      profileImage: "/assets/profile2.jpeg",
      username: "ashleychildress"
    },
    date: "Sep 10",
    title: "GitHub Coding Agent the Magical Autonomous AI: The Prequel",
    image: null,
    tags: [
      { name: "githubcopilot", color: "purple" },
      { name: "ai", color: "blue" },
      { name: "tutorial", color: "yellow" },
      { name: "productivity", color: "green" }
    ],
    reactions: {
      count: 8,
      types: ["❤️", "🦄"]
    },
    comments: 0,
    readTime: "9 min read",
    hasImage: false
  },
  {
    id: 3,
    author: {
      name: "John Developer",
      profileImage: "/assets/profile3.jpeg",
      username: "johndev"
    },
    date: "Sep 9",
    title: "Building Scalable React Applications with Modern Hooks",
    tags: [
      { name: "react", color: "blue" },
      { name: "javascript", color: "yellow" },
      { name: "frontend", color: "green" }
    ],
    reactions: {
      count: 23,
      types: ["❤️", "🔥", "💡"]
    },
    comments: 5,
    readTime: "7 min read",
    hasImage: true
  },
  {
    id: 4,
    author: {
      name: "Sarah Tech",
      profileImage: "/assets/profile4.jpeg",
      username: "sarahtech"
    },
    date: "Sep 8",
    title: "The Complete Guide to Docker for Beginners",
    image: null,
    tags: [
      { name: "docker", color: "blue" },
      { name: "devops", color: "purple" },
      { name: "beginners", color: "green" },
      { name: "tutorial", color: "yellow" }
    ],
    reactions: {
      count: 42,
      types: ["❤️", "🦄", "🔖"]
    },
    comments: 12,
    readTime: "12 min read",
    hasImage: false
  },
  {
    id: 5,
    author: {
      name: "Mike Frontend",
      profileImage: "/assets/profile5.jpeg",
      username: "mikefrontend"
    },
    date: "Sep 7",
    title: "CSS Grid vs Flexbox: When to Use Each",
    tags: [
      { name: "css", color: "blue" },
      { name: "webdev", color: "purple" },
      { name: "design", color: "pink" }
    ],
    reactions: {
      count: 18,
      types: ["❤️", "🔥"]
    },
    comments: 3,
    readTime: "6 min read",
    hasImage: true
  }
];

// Tag color mapping
export const tagColors = {
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-green-100 text-green-700 border-green-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
  pink: "bg-pink-100 text-pink-700 border-pink-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200"
};

export default samplePosts;