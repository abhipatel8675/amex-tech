export type ClientReview = {
  name: string;
  /** Optional: the client's website. Shown (and linked) only when present. */
  site?: { label: string; url: string };
  content: string;
  rating: 5;
};

// Client reviews shown on /reviews. Wording is lightly edited from what the
// clients wrote (shortened where long, "Abhi" changed to "Amex Technology").
export const clientReviews: ClientReview[] = [
  {
    name: "Jude Coleman",
    site: { label: "grammajujoobooks.com", url: "https://grammajujoobooks.com" },
    content:
      "Amex Technology is a delight to work with! The team can do it all, and quickly. Their communication is awesome, and I am thrilled with the website they created for me in record-breaking time. They were never overwhelmed by the assignments or suggestions I tossed their way, because they are extremely competent. They will be my go-to from here on out!",
    rating: 5,
  },
  {
    name: "Adam Rapoport",
    site: { label: "adamrapoport.com", url: "http://adamrapoport.com" },
    content:
      "Amex Technology built an automation between our Wavv Call Board and GoHighLevel, and did it properly. They studied how both systems work first, spotted a problem with the original approach that would have caused bad data, and proposed something better. The dialer stays the source of truth and the CRM only mirrors it, so nothing my reps do in Wavv can be overwritten. They also kept me updated on what was done, what was open and what was blocked.",
    rating: 5,
  },
  {
    name: "Eric Tang",
    content:
      "Amex Technology is good at what they do, and the more information you give them, the better. Expect roughly a 2 to 3 day estimate for completion because of reworks, but the work is good.",
    rating: 5,
  },
  {
    name: "Jean Moise",
    site: { label: "moveempire.app", url: "https://www.moveempire.app" },
    content:
      "Amex Technology did excellent work on the MoveEmpire app redesign. They rebuilt the inside of the app in our brand colors (blue, gold and black) so it looks like a top-tier platform, sent clear progress reports with screenshots of every screen on desktop and mobile, and got navigation working across all 62 screens. Nothing was deployed without approval, and they set up daily database backups without being asked. Communication was fast and professional the whole way.",
    rating: 5,
  },
  {
    name: "Bukky Osifeso",
    site: { label: "wearetag.ai", url: "https://wearetag.ai" },
    content:
      "Very skilful and professional. Good communication, and the work they did for me is mind blowing. I am really impressed. 10 out of 10, and I would highly recommend them.",
    rating: 5,
  },
];
