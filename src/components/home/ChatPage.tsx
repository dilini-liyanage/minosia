'use client';

import React, { useState } from 'react';

import Image from 'next/image';

interface ChatMessage {
  content: string;
  timestamp: string;
  isUser: boolean;
}

interface ChatPageProps {
  messages: ChatMessage[];
}

const ChatPage: React.FC<ChatPageProps> = ({ messages }) => {
  const [likedMessages, setLikedMessages] = useState<{
    [key: number]: boolean;
  }>({});
  const [dislikedMessages, setDislikedMessages] = useState<{
    [key: number]: boolean;
  }>({});
  const [copiedMessages, setCopiedMessages] = useState<{
    [key: number]: boolean;
  }>({});

  const handleLike = (index: number) => {
    setLikedMessages((prev) => ({ ...prev, [index]: !prev[index] }));
    setDislikedMessages((prev) => ({ ...prev, [index]: false }));
  };

  const handleDislike = (index: number) => {
    setDislikedMessages((prev) => ({ ...prev, [index]: !prev[index] }));
    setLikedMessages((prev) => ({ ...prev, [index]: false }));
  };

  const handleCopy = (index: number) => {
    setCopiedMessages((prev) => ({ ...prev, [index]: true }));
    // Implement actual copy functionality here
    setTimeout(() => {
      setCopiedMessages((prev) => ({ ...prev, [index]: false }));
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto pt-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className={`max-w-full flex space-x-3 p-3 rounded-lg`}>
              {!message.isUser && (
                <div>
                  <Image
                    src="/logo/logo-black.svg"
                    alt="Minosia"
                    width={48}
                    height={48}
                    className="items-center border border-gray-400 border-dashed p-1 rounded-lg"
                  />
                </div>
              )}
              <div>
                <p className="text-lg font-medium">{message.content}</p>
                {!message.isUser && (
                  <div>
                    <div className="flex space-x-4 my-4">
                      <button onClick={() => handleLike(index)}>
                        <Image
                          src={
                            likedMessages[index]
                              ? '/icons/like.svg'
                              : '/icons/like.svg'
                          }
                          width={20}
                          height={20}
                          alt="Like"
                        />
                      </button>
                      <button onClick={() => handleDislike(index)}>
                        <Image
                          src={
                            dislikedMessages[index]
                              ? '/icons/dislike.svg'
                              : '/icons/dislike.svg'
                          }
                          width={20}
                          height={20}
                          alt="Dislike"
                        />
                      </button>
                      <button onClick={() => handleCopy(index)}>
                        <Image
                          src={
                            copiedMessages[index]
                              ? '/icons/copy.svg'
                              : '/icons/copy.svg'
                          }
                          width={20}
                          height={20}
                          alt="Copy"
                        />
                      </button>
                      <button>
                        <Image
                          src="/icons/regenerate.svg"
                          width={20}
                          height={20}
                          alt="Refresh"
                        />
                      </button>
                    </div>
                    <div className="bg-[#F8F8FC] p-3 rounded-lg me-24 text-lg">
                      <div className="bg-white rounded-lg p-2 space-y-2">
                        <div className="font-semibold">
                          Lorem ipsum dolor sit amet consectetur. Massa donec ac
                          velit vulputate amet.
                        </div>
                        <div>Verified Source as of 24 july 2024</div>
                        <Image
                          src="/icons/link-icon.svg"
                          width={24}
                          height={24}
                          alt="Picture of the author"
                          className="items-center"
                        />
                      </div>
                      <div className="mt-2">
                        Lorem ipsum dolor sit amet consectetur. Sollicitudin
                        volutpat netus et scelerisque facilisis ornare ultricies
                        turpis ultricies. Massa enim vel dolor libero auctor
                        mauris placerat volutpat bibendum.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
