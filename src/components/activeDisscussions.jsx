import React from "react";

const ActiveDiscussions = () => {
  const discussions = [
    {
      id: 1,
      discussion: "How to learn React?",
      comments: 12,
    },
    {
      id: 2,
      discussion: "Best practices for Node.js",
      comments: 8,
    },
    {
      id: 3,
      discussion: "CSS Grid vs Flexbox",
      comments: 5,
    },
    {
      id: 4,
      discussion: "State management in large apps",
      comments: 15,
    },
    {
      id: 5,
      discussion: "Deploying apps with Docker",
      comments: 7,
    },
    {
      id: 6,
      discussion: "Understanding TypeScript",
      comments: 10,
    },
    {
      id: 7,
      discussion: "GraphQL vs REST APIs",
      comments: 9,
    },
    ];
    return (
        <div className="flex items-start p-3">
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Active Discussions</h2>
            <ul className="space-y-4">
                {discussions.map((item) => (
                    <li key={item.id} className="border-b pb-3">
                        <a href="#" className=" hover:underline text-grey-600">
                            {item.discussion}
                        </a>
                        <p className="text-sm text-gray-500">{item.comments} comments</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default ActiveDiscussions;