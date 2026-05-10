"use client";

import { useEffect, useState } from "react";

type Announcement = {
  id: number;
  text: string;
};

export const AnnouncementBar = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);

      // Simulated API
      setTimeout(() => {
        setAnnouncements([
          {
            id: 1,
            text: "✦ Complimentary Pan-India Shipping on Orders Above ₹4,999",
          },
          {
            id: 2,
            text: "✦ New Summer Collection Now Live",
          },
          {
            id: 3,
            text: "✦ Handcrafted Heritage Since 1984",
          },
          {
            id: 4,
            text: "✦ 30-Day Easy Returns",
          },
        ]);

        setLoading(false);
      }, 500);
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="bg-primary text-white py-2 text-center text-xs tracking-widest uppercase">
        Loading announcements...
      </div>
    );
  }

  return (
    <section className="bg-primary text-white overflow-hidden whitespace-nowrap py-2.5">
      <div className="animate-marquee flex w-max gap-16">
        {[...announcements, ...announcements].map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className="text-[11px] uppercase tracking-[0.15em] flex-shrink-0"
          >
            {item.text}
          </span>
        ))}
      </div>
    </section>
  );
};

;