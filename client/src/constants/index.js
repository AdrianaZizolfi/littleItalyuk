const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Chi Siamo",
      link: "#about",
    },
    {
      name: "Eventi",
      link: "/events",
      children: [
      { name: 'S.Gennaro Fest', link: '/sangennaro' },
      { name: 'Fashion Show', link: '/fashion' }
    ]
    },
    {
      name: "Contatti",
      link: "#contatti",
    },
    // {
    //     name: "Merchandising",
    //     link: "/merchandising",
    //   },
   
  ];

  const words = [
    { text: "Community", imgPath: "/images/can.png" },
    { text: "Tradizione", imgPath: "/images/pizza.png" },
    { text: "Cultura", imgPath: "/images/vespa.png" },
    { text: "Passione", imgPath: "/images/place.png" },
    { text: "Community", imgPath: "/images/can.png" },
    { text: "Tradizione", imgPath: "/images/pizza.png" },
    { text: "Cultura", imgPath: "/images/vespa.png" },
    { text: "Passione", imgPath: "/images/place.png" },
  ];
  
  const counterItems = [
    { value: 5, suffix: "+", label: "Years of Experience" },
    { value: 100, suffix: "+", label: "Satisfied Clients" },
    { value: 55, suffix: "+", label: "Completed Projects" },
    { value: 90, suffix: "%", label: "Client Retention Rate" },
  ];
  
  const VendorsLogoList = [
    {
      imgPath: "/images/logos/logo1.jpg",
    },
    {
      imgPath: "/images/logos/logo2.png",
    },
    {
      imgPath: "/images/logos/logo3.png",
    },
    {
      imgPath: "/images/logos/logo4.png",
    },
    {
      imgPath: "/images/logos/logo1.jpg",
    },
    {
      imgPath: "/images/logos/logo2.png",
    },
    {
      imgPath: "/images/logos/logo3.png",
    },
    {
      imgPath: "/images/logos/logo4.png",
    },
    // {
    //   imgPath: "/images/logos/company-logo-9.png",
    // },
    // {
    //   imgPath: "/images/logos/company-logo-10.png",
    // },
    // {
    //   imgPath: "/images/logos/company-logo-11.png",
    // },
  ];
  
  const vendorsName = [
    {
      imgPath: "/images/vendors/pellone.jpg",
      title: "Pellone",
      link:"https://www.instagram.com/pizzeriapellonelondon?igsh=MTQyY2s2NXV2cWRxYg%3D%3D",
    },
    {
      imgPath: "/images/vendors/vincenzo_ltd.jpg",
      title: "Vincenzo Ltd",
      link: "https://www.instagram.com/vincenzo.ltd?igsh=MWpyNjFnc3lvNGo0Zg==",
    },
    {
      imgPath: "/images/vendors/scugnizzi.jpg",
      title: "Scugnizzi",
      link: "https://www.instagram.com/scugnizziuk?igsh=bjBhZ25uZG11ZnFu",
    },
    {
      imgPath: "/images/vendors/mamma_rosa.jpg",
      title: "Mamma Rosa",
      link: "https://www.instagram.com/mammarosa.london?igsh=ajMyb2tib2FvYWE1",
    },
    {
      imgPath: "/images/vendors/081.jpg",
      title: "081",
      link: "https://www.instagram.com/081pizzerialdn?igsh=MWoyaTQ3YThlcHVtMQ==",
    },
    {
      imgPath: "/images/vendors/mirash.jpg",
      title: "Mirash",
      link: "https://www.instagram.com/mirashpastaandpastry?igsh=MTE4Zmx0dWk1YmxjcA%3D%3D&utm_source=qr",
    },
    {
      imgPath: "/images/vendors/odg.jpg",
      title: "Officina del Gusto",
      link: "https://www.instagram.com/officinadelgustofocacceria?igsh=MTh4dGo5OGJ3ZGlzbA%3D%3D",
    },
    {
      imgPath: "/images/vendors/porchetta.jpg",
      title: "Medite food",
      link: "https://www.instagram.com/medite_food?igsh=MTc2OWY5ZDB6Y3V5NQ%3D%3D&utm_source=qr",
    },
    {
      imgPath: "/images/vendors/sicilian_pride.jpg",
      title: "Sicilian Pride",
      link: "https://www.instagram.com/sicilianprideltd?igsh=MTlrd2o1eGRjNTVjbA==",
    },
    {
      imgPath: "/images/vendors/unlock.jpg",
      title: "Unlock",
      link: "https://www.instagram.com/unlock_pizza",
    },
    {
      imgPath: "/images/vendors/island_food.webp",
      title: "Island Food",
      link: "https://www.instagram.com/island.of.food_london?igsh=MXBoOTRjMjJzaWgzdA%3D%3D",
    },
    {
      imgPath: "/images/vendors/azz.jpg",
      title: "Azz taste of Amalfi",
      link: "https://www.instagram.com/azz_tasteofamalfi_london?igsh=cjAzdHh4YjJtY2x6",
    },
  ];
  
  const abilities = [
    {
      imgPath: "/images/seo.png",
      title: "Quality Focus",
      desc: "Delivering high-quality results while maintaining attention to every detail.",
    },
    {
      imgPath: "/images/chat.png",
      title: "Reliable Communication",
      desc: "Keeping you updated at every step to ensure transparency and clarity.",
    },
    {
      imgPath: "/images/time.png",
      title: "On-Time Delivery",
      desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
    },
  ];
  
  const teamImgs = [
  { name: "Davide", imgPath: "/images/davide.jpg", descriptionKey: "davide_description", roleKey: "davide_role" },
  { name: "Vincenzo", imgPath: "/images/vincenzo.jpg", descriptionKey: "vincenzo_description", roleKey: "vincenzo_role" },
  { name: "Tommy", imgPath: "/images/tommy.jpg", descriptionKey: "tommy_description", roleKey: "tommy_role" },
  ];

  const collabImgs = [
  { name: "Angelica", imgPath: "/images/angelica.jpg", descriptionKey: "angelica_description" },
  // { name: "Nicoletta", imgPath: "/images/nicoletta.jpg", descriptionKey: "nicoletta_description" },
  // { name: "Angela", imgPath: "/images/angela.jpg", descriptionKey: "angela_description" },

    // {
    //   name: "Nome 3",
    //   imgPath: "/images/Rectangle4.png",
    //   description:"",
    // },
    // {
    //   name: "Nome 4",
    //   imgPath: "/images/Rectangle5.png",
    //   description:"",
    // },
    // {
    //   name: "Nome 5",
    //   imgPath: "/images/Rectangle4.png",
    //   description:"",
    // },
    
  ];
  
  
  const expCards = [
    {
      review: "Adrian brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
      imgPath: "/images/exp1.png",
      logoPath: "/images/logo1.png",
      title: "Frontend Developer",
      date: "January 2023 - Present",
      responsibilities: [
        "Developed and maintained user-facing features for the Hostinger website.",
        "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
        "Optimized web applications for maximum speed and scalability.",
      ],
    },
    {
      review: "Adrian’s contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
      imgPath: "/images/exp2.png",
      logoPath: "/images/logo2.png",
      title: "Full Stack Developer",
      date: "June 2020 - December 2023",
      responsibilities: [
        "Led the development of Docker's web applications, focusing on scalability.",
        "Worked with backend engineers to integrate APIs seamlessly with the frontend.",
        "Contributed to open-source projects that were used with the Docker ecosystem.",
      ],
    },
    {
      review: "Adrian’s work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
      imgPath: "/images/exp3.png",
      logoPath: "/images/logo3.png",
      title: "React Native Developer",
      date: "March 2019 - May 2020",
      responsibilities: [
        "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
        "Improved app performance and user experience through code optimization and testing.",
        "Coordinated with the product team to implement features based on feedback.",
      ],
    },
  ];
  
  const expLogos = [
    {
      name: "logo1",
      imgPath: "/images/logo1.png",
    },
    {
      name: "logo2",
      imgPath: "/images/logo2.png",
    },
    {
      name: "logo3",
      imgPath: "/images/logo3.png",
    },
  ];
  
  
  const socialImgs = [
    {
      name: "insta",
      url:"https://www.instagram.com/littleitalyukldn/",
      imgPath: "/images/insta.png",
    },
    {
      name: "https://www.facebook.com/profile.php?id=61568443648562",
      imgPath: "/images/fb.png",
    },
    
    {
      name: "tiktok",
      url: "https://www.tiktok.com/@littleitalyukldn?_t=ZN-8yY5ZNqY4AA&_r=1",
      imgPath: "/images/tt.png",
    },
  ];
  
  export {
    words,
    abilities,
    VendorsLogoList,
    vendorsName,
    counterItems,
    expCards,
    expLogos,
    socialImgs,
    teamImgs,
    collabImgs,
    navLinks,
  };