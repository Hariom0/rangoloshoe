
type Announcement = {
  id: number;
  text: string;
};

export const AnnouncementBar = () => {

const announcements = [
          {
            id: 1,
            text: "✦ Complimentary Pan-India Shipping on Orders Above ₹1,499",
          },
          {
            id: 2,
            text: "✦ New Summer Collection Now Live",
          },
          {
            id: 3,
            text: "✦ Handcrafted Heritage Since 1975",
          },
        ]

  return (
    <section className="bg-primary text-white overflow-hidden whitespace-nowrap py-2.5">
      <div className="animate-marquee flex w-max gap-16">
        {[...announcements, ...announcements, ...announcements].map((item, index) => (
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