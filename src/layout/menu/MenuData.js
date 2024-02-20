const menu = [
  {
    heading: "Use-case preview",
  },

  {
    heading: "Dashboards",
  },
  {
    icon: "user-fill",
    text: "All User",
    link: "/",
  },

  {
    icon: "tile-thumb-fill",
    text: "Home",
    active: false,
    subMenu: [
      {
        text: "Slider",
        link: "/slider",
      },
      {
        text: "Faq",
        link: "/faq",
      },
      {
        text: "Who We Are",
        link: "/who-we-are",
      },
    ],
  },
  {
    icon: "tile-thumb-fill",
    text: "About",
    active: false,
    subMenu: [
      {
        text: "Banner",
        link: "/banner",
      },
      {
        text: "About ARC Foundation",
        link: "/about-arcf",
      },
      {
        text: "Ex-Chairman",
        link: "/ex-chairman",
      },
      {
        text: "Chairman",
        link: "/chairman",
      },
      {
        text: "Vice Chairman",
        link: "/vice-chairman",
      },
      {
        text: "Assistant Vice Chairman",
        link: "/assistant-vice-chairman",
      },
      {
        text: "Director",
        link: "/director",
      },
      {
        text: "Our Management ",
        link: "/management",
      },
      {
        text: "Our Volunteer ",
        link: "/volunteer",
      },
    ],
  },
  {
    heading: "Projects Page",
  },
  {
    icon: "tile-thumb-fill",
    text: "Projects",
    active: false,
    subMenu: [
      {
        text: "Project Banner",
        link: "/project-banner",
      },
      {
        text: "Project Details",
        link: "/project-details",
      },
      {
        text: "All Project",
        link: "/projects",
      },
    ],
  },

  {
    icon: "tile-thumb-fill",
    text: "Project Subcategory",
    active: false,
    subMenu: [
      {
        text: "Subcategory Header & Description",
        link: "/project-subcategory-header",
      },
      {
        text: "All Subcategory",
        link: "/project-subcategory",
      },

      {
        text: "Project Subcategory Description",
        link: "/project-subcategory-description",
      },
    ],
  },

  {
    heading: "News Page",
  },
  {
    icon: "tile-thumb-fill",
    text: "News",
    active: false,
    subMenu: [
      {
        text: "News",
        link: "/news",
      },
      {
        text: "News Banner",
        link: "/news-banner",
      },
      {
        text: "News Details",
        link: "/news-details",
      },

      {
        text: "News Category Description",
        link: "/news-category-description",
      },
    ],
  },
  {
    icon: "tile-thumb-fill",
    text: "Events",
    active: false,
    subMenu: [
      {
        text: "Events",
        link: "/events",
      },
      {
        text: "Events Banner",
        link: "/events-banner",
      },
      {
        text: "Events Details",
        link: "/events-details",
      },
      {
        text: "Events Category Description",
        link: "/events-category-description",
      },
    ],
  },

  {
    heading: "Donation Page",
  },

  {
    icon: "tile-thumb-fill",
    text: "Donation",
    active: false,
    subMenu: [
      {
        text: "Donation Banner & Description",
        link: "/donation-banner-description",
      },
      {
        text: "Donation",
        link: "/donation",
      },
    ],
  },

  {
    heading: "Gallery Page",
  },

  {
    icon: "tile-thumb-fill",
    text: "Gallery",
    active: false,
    subMenu: [
      {
        text: "Gallery Category Description",
        link: "/gallery-category-description",
      },
      {
        text: "Image Gallery",
        link: "/image-gallery",
      },
      {
        text: "Video Gallery",
        link: "/video-gallery",
      },
    ],
  },

  {
    heading: "Contact Page",
  },

  {
    icon: "tile-thumb-fill",
    text: "Contact",
    active: false,
    subMenu: [
      {
        text: "Contact Slider",
        link: "/contact-slider",
      },
    ],
  },
];
export default menu;
