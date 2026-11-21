// Long-form content for the /services/<slug> pages. Keyed by the slug in
// services.ts; projects are referenced by slug so links never go stale.
// Written for business owners: what we do, who it helps and what changes for you.
export type ServicePage = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  // Answer-first opening: what it is, who it's for, how we do it.
  intro: string[];
  whoFor: string[];
  deliverables: { title: string; body: string }[];
  process: { title: string; body: string }[];
  projectSlugs: string[];
  blogSlugs: string[];
  faq: { question: string; answer: string }[];
};

export const servicePages: Record<string, ServicePage> = {
  "ai-services": {
    metaTitle: "AI Assistants & Business Automation",
    metaDescription:
      "AI assistants that answer customers, sort enquiries and handle paperwork, plus automations that connect your everyday tools. Free consultation.",
    h1: "AI assistants and automation that take work off your team",
    intro: [
      "Amex Technology builds AI assistants and automations for businesses around the world. An assistant can answer your customers' questions, sort new enquiries and book appointments. An automation can read your invoices and forms, enter the details for you, and keep your everyday tools in sync.",
      "Every assistant we build has clear limits and passes the conversation to a real person when it is unsure, so it helps your customers instead of embarrassing you.",
    ],
    whoFor: [
      "Small businesses answering the same customer questions all day",
      "Sales teams who need every enquiry answered quickly",
      "Operations teams retyping details between emails, PDFs and spreadsheets",
      "Founders who want smart features inside their own product",
    ],
    deliverables: [
      {
        title: "Chat and voice assistants",
        body: "Assistants on your website, by text message or by phone that answer questions using your own information, book appointments and pass promising enquiries to your team.",
      },
      {
        title: "Paperwork done for you",
        body: "Invoices, forms and emails are read automatically and the details are added to your records. Anything the assistant is unsure about is flagged for a person to check.",
      },
      {
        title: "Your tools working together",
        body: "A new enquiry, order or booking triggers the right next steps automatically, across the programs you already pay for.",
      },
      {
        title: "Smart features inside your product",
        body: "Summaries, drafting, sorting and search added to your website or app, with usage limits so costs stay predictable.",
      },
    ],
    process: [
      { title: "Map the work", body: "We list the repetitive tasks, how often they happen and what a good result looks like." },
      { title: "Try it on real examples", body: "A small working version using your own examples, so you can judge the quality before committing." },
      { title: "Build in safety", body: "Records of every conversation, spending limits and a hand-over to your team for anything the assistant should not decide alone." },
      { title: "Launch and fine-tune", body: "We watch real conversations for the first weeks and adjust until it works the way you want." },
    ],
    projectSlugs: ["dialogix", "molar-ai", "periscope-email"],
    blogSlugs: [],
    faq: [
      {
        question: "What is the difference between an AI assistant and a normal chatbot?",
        answer:
          "A normal chatbot follows a fixed script. An AI assistant understands everyday questions, looks up answers in your own information, and can take actions such as booking an appointment. We still give every assistant clear limits and a hand-over to a person.",
      },
      {
        question: "Is my business information safe?",
        answer:
          "We only share the information a task needs, choose settings that stop your data being used to train other systems, and keep records in accounts you own. Sensitive actions need a person's approval.",
      },
      {
        question: "How long does it take?",
        answer:
          "A single focused automation often takes one to three weeks. A customer-facing assistant connected to several of your systems usually takes four to eight weeks, including testing with real conversations.",
      },
    ],
  },
  "web-development": {
    metaTitle: "Website & Web App Development",
    metaDescription:
      "Fast, good-looking websites and online tools for businesses worldwide: customer accounts, dashboards, booking and ordering. Free consultation.",
    h1: "Websites and online tools your customers will actually use",
    intro: [
      "Amex Technology builds business websites and the online tools behind them: customer accounts, dashboards, booking, ordering and internal systems. One team looks after the whole thing, so nothing gets lost between a designer, a developer and a host.",
      "We build sites that load quickly, look right on phones, can be found on Google and are easy for your own team to update.",
    ],
    whoFor: [
      "Businesses whose current website is slow, dated or hard to use on a phone",
      "Companies that need customers to log in, order, book or track something online",
      "Teams still running things from spreadsheets and email",
      "Founders who need a website and a working product from the same team",
    ],
    deliverables: [
      {
        title: "A website that wins customers",
        body: "Clear pages, honest content and easy ways to contact you, designed so visitors know what you do and what to do next.",
      },
      {
        title: "Customer accounts and dashboards",
        body: "Places where your customers or your staff can log in, see their information and get things done without a phone call.",
      },
      {
        title: "Booking, ordering and payments",
        body: "Online forms, orders and payments connected to your email and customer records, so every request reaches the right person.",
      },
      {
        title: "Easy updates",
        body: "A simple way to change text, photos and offers yourself, without waiting for a developer.",
      },
    ],
    process: [
      { title: "Understand your goals", body: "We learn about your business, your customers and what the website must achieve." },
      { title: "Plan and preview", body: "You see the pages and the main journeys before we build them, and agree on details early." },
      { title: "Build and review", body: "We build in steps and share working previews, so you can react along the way." },
      { title: "Launch and support", body: "We test on phones, tablets and computers, launch the site and stay available afterwards." },
    ],
    projectSlugs: ["goswiftfund", "wolfe-property", "ultra-windows", "firmsledger", "island-traffic-defense"],
    blogSlugs: [],
    faq: [
      {
        question: "How long does a website take?",
        answer:
          "A simple business website is often ready in two to four weeks. A website with customer accounts, ordering or dashboards usually takes six to twelve weeks. We share a clear timeline with your quote.",
      },
      {
        question: "Can you improve the website I already have?",
        answer:
          "Yes. We can fix problems, speed it up, make it work better on phones, or rebuild it while keeping the page addresses you already rank for.",
      },
      {
        question: "Will I own the website?",
        answer:
          "Yes. Your website, domain and accounts stay in your name, so you are never locked in.",
      },
      {
        question: "How is the cost decided?",
        answer:
          "It depends on how many pages and features you need. After a free call we send a clear written quote before any work starts.",
      },
    ],
  },
  "saas-development": {
    metaTitle: "Turn Your Idea Into a Product",
    metaDescription:
      "From product idea to a first version customers can sign up for and pay for. We also strengthen prototypes made with AI app builders. Free consultation.",
    h1: "Turn your product idea into something customers can pay for",
    intro: [
      "Amex Technology helps founders and growing companies turn an idea into a working first version: sign-up, payments, the core features and the basics you need to grow. We keep the first version focused, so you can start learning from real customers quickly.",
      "Already made a prototype with an AI app builder? We can make it solid enough for real customers: safer, faster and ready for more visitors.",
    ],
    whoFor: [
      "Founders with a product idea and no technical team",
      "Businesses turning a service into software their customers can use",
      "Anyone with an AI-built prototype that now needs to be reliable",
      "Teams adding AI features to an existing product",
    ],
    deliverables: [
      {
        title: "A launch-ready first version",
        body: "Sign-up, login, the core features and a simple admin area, built so you can show it to real customers.",
      },
      {
        title: "Payments and subscriptions",
        body: "Customers can pay, upgrade and cancel on their own, and you can see who is paying.",
      },
      {
        title: "Private, separate customer data",
        body: "Each customer sees only their own information, with the protection that real business data deserves.",
      },
      {
        title: "Prototype clean-up",
        body: "We review apps made with AI builders, fix what is fragile or unsafe, and prepare them for real traffic.",
      },
    ],
    process: [
      { title: "Shape the idea", body: "We help decide what the first version must do, and what can wait." },
      { title: "Design the experience", body: "You see how it will look and feel before we build it." },
      { title: "Build in short steps", body: "Working previews every week or two, so you always see progress." },
      { title: "Launch and learn", body: "We help you go live, read the early results and plan what comes next." },
    ],
    projectSlugs: ["hoursheets", "hmd", "periscope-email", "goswiftfund"],
    blogSlugs: [],
    faq: [
      {
        question: "How long until I can launch?",
        answer:
          "A focused first version commonly takes six to twelve weeks, depending on the features. We agree the plan and timeline with you up front.",
      },
      {
        question: "My app was built with an AI builder. Can you take it further?",
        answer:
          "Yes. We review what exists, tell you honestly what to keep and what to rebuild, and then make it ready for real customers.",
      },
      {
        question: "Do I keep ownership of the product?",
        answer:
          "Yes. The product, the accounts and everything behind it belong to you.",
      },
    ],
  },
  "seo-services": {
    metaTitle: "Get Found on Google & AI Search",
    metaDescription:
      "Help customers find you on Google and get recommended by AI assistants: a clear check-up, your business listing, better pages and monthly reports.",
    h1: "Get found on Google and recommended by AI assistants",
    intro: [
      "Customers now look for businesses in two places: on Google, and by asking AI assistants. Amex Technology helps you show up in both. We find what holds your site back, build pages around what your customers really search for, and set up your Google business listing properly.",
      "We explain every step in plain language and report on results honestly. No one can promise a number one ranking, so we focus on the work that reliably helps.",
    ],
    whoFor: [
      "Businesses that are hard to find when customers search",
      "Shops and service companies that want more local enquiries",
      "Companies whose competitors always appear above them",
      "Owners who want to be recommended by AI assistants",
    ],
    deliverables: [
      {
        title: "A clear check-up",
        body: "A plain-language report on what is holding your site back, in order of what matters most.",
      },
      {
        title: "Your Google business listing",
        body: "Your listing set up, verified and kept accurate, so you appear in map results and local searches.",
      },
      {
        title: "Pages built around real searches",
        body: "Pages and articles that answer the questions your customers actually ask.",
      },
      {
        title: "Helping AI assistants understand you",
        body: "Clear, consistent information about your business, so AI tools can describe and recommend you correctly.",
      },
    ],
    process: [
      { title: "Check-up", body: "We review your site, your listing and your competitors." },
      { title: "Plan", body: "You get a short, prioritised plan in plain language." },
      { title: "Do the work", body: "We fix the problems and create the content, with your approval." },
      { title: "Report", body: "Each month you see how many more people found you, and what we will do next." },
    ],
    projectSlugs: ["firmsledger", "island-traffic-defense"],
    blogSlugs: [],
    faq: [
      {
        question: "Can you guarantee a number one spot on Google?",
        answer:
          "No honest company can. Results depend on many things we do not control. We focus on the work that reliably improves your visibility and we report openly on what changes.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Fixes to your listing can help within weeks. Pages and articles usually take a few months to build up. We show the early signs in your monthly report.",
      },
      {
        question: "Do you also help with AI search?",
        answer:
          "Yes. Part of our work is making sure AI assistants can understand your business and describe it accurately.",
      },
    ],
  },
  "aeo-services": {
    metaTitle: "Be the Answer in AI Search",
    metaDescription:
      "Get quoted by Google's AI answers, ChatGPT and voice assistants. We research customer questions and write clear answers on your site.",
    h1: "Be the answer when customers ask AI and voice assistants",
    intro: [
      "More people now get a direct answer instead of a list of links, from Google's AI answers, chat assistants and voice assistants. Amex Technology helps your business be the one that gets quoted.",
      "We find the questions your customers ask, write clear answers on your site, set things up so answer engines can read it, and check where your name appears.",
    ],
    whoFor: [
      "Businesses whose customers ask a lot of questions before buying",
      "Experts and service companies who want to be seen as the authority",
      "Companies who notice AI tools recommending their competitors",
      "Anyone who wants to be found by voice search",
    ],
    deliverables: [
      {
        title: "The questions your customers ask",
        body: "Research into the real questions people type and say before they choose a business like yours.",
      },
      {
        title: "Clear, answer-first pages",
        body: "Pages and FAQs that give a short, direct answer first and the detail after.",
      },
      {
        title: "Behind-the-scenes setup",
        body: "The invisible information that helps search and AI tools read, trust and quote your site.",
      },
      {
        title: "Brand mention checks",
        body: "Regular checks on whether AI assistants mention you, and whether what they say is correct.",
      },
    ],
    process: [
      { title: "Find the questions", body: "We collect the questions customers ask about your products and services." },
      { title: "Write the answers", body: "We write clear answers in your voice and check every fact with you." },
      { title: "Set it up", body: "We prepare your site so answer engines can read it easily." },
      { title: "Check and improve", body: "We track where you appear and keep improving the answers." },
    ],
    projectSlugs: ["firmsledger"],
    blogSlugs: [],
    faq: [
      {
        question: "How is this different from normal search work?",
        answer:
          "Normal search work helps you appear in a list of links. This work helps you be the answer itself, quoted in a summary or spoken aloud.",
      },
      {
        question: "Can you promise AI tools will mention my business?",
        answer:
          "No. These tools decide for themselves. We make your information clear, accurate and easy to use, which gives you the best chance.",
      },
    ],
  },
  "crm-automation": {
    metaTitle: "Customer Follow-Up Automation",
    metaDescription:
      "Never lose a lead: enquiries from your website, calls and ads land in one place and get automatic follow-ups by text and email.",
    h1: "Never lose a lead: every enquiry followed up automatically",
    intro: [
      "Amex Technology sets up and repairs the system you use to track customers, so no enquiry slips through the cracks. Website forms, phone calls and ads all feed one clear list, and follow-ups go out by text and email at the right time.",
      "You can see at a glance who is waiting, who has replied and what is turning into sales.",
    ],
    whoFor: [
      "Businesses who miss or forget to follow up on enquiries",
      "Teams with a customer system that is half set up or broken",
      "Companies running ads and unsure which ones bring customers",
      "Owners who want less admin and more booked work",
    ],
    deliverables: [
      {
        title: "One clear pipeline",
        body: "A simple view of every customer from first enquiry to sale, so nothing is forgotten.",
      },
      {
        title: "Automatic follow-ups",
        body: "Friendly texts and emails sent at the right moments, from a quick thank-you to a gentle reminder.",
      },
      {
        title: "Everything connected",
        body: "Website forms, calls, ads and payments all feeding the same place.",
      },
      {
        title: "A health check",
        body: "We find broken steps and lost leads in your current setup and fix them.",
      },
    ],
    process: [
      { title: "Review what you have", body: "We look at how enquiries arrive and where they get lost today." },
      { title: "Design the journey", body: "We agree the steps from enquiry to customer, and the messages along the way." },
      { title: "Set up and test", body: "We build it, test it with real examples and train your team." },
      { title: "Watch and improve", body: "We check the first weeks of results and fine-tune." },
    ],
    projectSlugs: ["portland-self-defense-crm", "dialogix"],
    blogSlugs: [],
    faq: [
      {
        question: "Can you fix a system that is already half set up?",
        answer:
          "Yes. Many projects start that way. We review what exists, keep what works and repair the rest.",
      },
      {
        question: "Will the messages sound robotic?",
        answer:
          "No. We write them in your voice, keep them short and personal, and make it easy for people to reply or opt out.",
      },
    ],
  },
  "mobile-app-development": {
    metaTitle: "Mobile App Development: iPhone & Android",
    metaDescription:
      "iPhone and Android apps built from one project, with smart features and publishing to both app stores handled for you.",
    h1: "Mobile apps for iPhone and Android, built once",
    intro: [
      "Amex Technology designs and builds mobile apps that work on both iPhone and Android from a single project. That means one team, one budget and one set of features, instead of building everything twice.",
      "We can add smart features such as chat, voice and photo recognition, and we take care of publishing to the App Store and Google Play.",
    ],
    whoFor: [
      "Businesses who want to put their service in customers' pockets",
      "Founders launching a new app",
      "Companies whose staff need a tool for the field",
      "Teams with an existing app that needs fixing or updating",
    ],
    deliverables: [
      {
        title: "One app, both phones",
        body: "A single app that feels at home on iPhone and Android.",
      },
      {
        title: "Smart features",
        body: "Chat, voice and camera features that make the app genuinely useful.",
      },
      {
        title: "Store publishing",
        body: "We prepare and submit your app to the App Store and Google Play and deal with the review process.",
      },
      {
        title: "Notifications and reports",
        body: "Messages to your users, and simple reports on how the app is used.",
      },
    ],
    process: [
      { title: "Define the app", body: "We agree who it is for and what the first version must do." },
      { title: "Design the screens", body: "You can click through a preview of the app before it is built." },
      { title: "Build and test", body: "We build in steps and test on real phones." },
      { title: "Publish and support", body: "We publish to both stores and stay on hand after launch." },
    ],
    projectSlugs: ["emigo", "herruby-app"],
    blogSlugs: [],
    faq: [
      {
        question: "Will it work properly on both iPhone and Android?",
        answer:
          "Yes. It is built as one project but follows the habits and look of each phone, and we test on real devices.",
      },
      {
        question: "Do you handle the App Store review?",
        answer:
          "Yes. We prepare everything the stores ask for and respond to any questions during review.",
      },
    ],
  },
  "ui-ux-design": {
    metaTitle: "Website & App Design",
    metaDescription:
      "Clear, modern designs that turn visitors into customers: research, layouts, clickable previews and designs ready for building.",
    h1: "Clear, modern design that turns visitors into customers",
    intro: [
      "Good products start with good design. Amex Technology works out what your visitors want to do, sketches the experience, and builds previews you can click through before anything is built.",
      "You get designs that are easy to use, consistent across every page and ready for developers to build exactly as drawn.",
    ],
    whoFor: [
      "Businesses whose website or app is confusing to use",
      "Founders who want to test an idea before building it",
      "Companies refreshing an out-of-date look",
      "Teams who need a design that builders can follow",
    ],
    deliverables: [
      {
        title: "Understanding your visitors",
        body: "Research into who uses your product, what they want and where they get stuck.",
      },
      {
        title: "Layouts and previews",
        body: "Page layouts and clickable previews you can try early, when changes are cheap.",
      },
      {
        title: "A consistent look",
        body: "Colours, type and buttons that work together across your whole product.",
      },
      {
        title: "Ready to build",
        body: "Clear designs and notes handed to your builders, so the finished product matches.",
      },
    ],
    process: [
      { title: "Listen and research", body: "We learn about your business and your visitors." },
      { title: "Sketch", body: "Early layouts that explore different ways to solve the problem." },
      { title: "Refine", body: "We polish the best idea together with you." },
      { title: "Hand over", body: "Final designs and a guide, ready for building." },
    ],
    projectSlugs: ["east-end-vintage-sale", "zenscroll", "wide-eyed-giant", "buttercream-bus"],
    blogSlugs: [],
    faq: [
      {
        question: "Can you redesign my existing website?",
        answer:
          "Yes. We can refresh the look, improve how it works, or rethink it completely, while keeping what already works well.",
      },
      {
        question: "Do you also build what you design?",
        answer:
          "Yes, if you would like. Having the same team design and build keeps everything accurate and avoids delays.",
      },
    ],
  },
  "devops-deployment": {
    metaTitle: "Hosting, Upkeep & Website Care Plans",
    metaDescription:
      "Reliable hosting, backups, security updates and monthly care so your website or app stays online and up to date.",
    h1: "Hosting and care so your site or app stays up and up to date",
    intro: [
      "A website is not finished when it launches. Amex Technology sets up reliable hosting and then looks after it: backups, monitoring and security updates keep you online, and a monthly care plan covers fixes and small improvements.",
      "If something goes wrong, you have someone to call, who already knows your site.",
    ],
    whoFor: [
      "Businesses whose site goes down or runs slowly",
      "Owners who inherited a site and don't know how it works",
      "Companies that want fixes and updates handled each month",
      "Anyone whose business emails land in spam",
    ],
    deliverables: [
      {
        title: "Smooth updates",
        body: "Changes go live without taking your site offline.",
      },
      {
        title: "Watching over your site",
        body: "Alerts when something slows down, breaks or looks unsafe.",
      },
      {
        title: "Backups and updates",
        body: "Regular backups and security updates, so a problem is never a disaster.",
      },
      {
        title: "Address and email set-up",
        body: "Your web address, security certificate and business email set up correctly, so messages arrive in inboxes, not spam.",
      },
    ],
    process: [
      { title: "Review", body: "We look at where your site lives today and how it is looked after." },
      { title: "Secure and move", body: "We put access in accounts you own and fix any risks." },
      { title: "Set up monitoring", body: "We add alerts and backups so problems are caught early." },
      { title: "Ongoing care", body: "Each month we update, fix and improve, and tell you what we did." },
    ],
    projectSlugs: ["firmsledger", "goswiftfund", "tiancheng-development-group"],
    blogSlugs: [],
    faq: [
      {
        question: "Can you take over a website another developer built?",
        answer:
          "Yes. We review it, move access into accounts you own, document how it works and then look after it.",
      },
      {
        question: "Why do my business emails go to spam?",
        answer:
          "Usually because a few behind-the-scenes settings for your web address are missing or wrong. We check and correct them, then test that messages arrive properly.",
      },
    ],
  },
};
