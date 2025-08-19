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
    // {
    //   name: "Luxury",
    //   link: "/events",
    // },
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
    {
      name: "Davide",
      imgPath: "/images/davide.jpg",
      description: "Fondatore di Little Italy UK, cura i rapporti con la comunita' e le partnership strategiche, mantenendo solide relazioni con sponsor e collaboratori. Figura di spicco della scena italiana a Londra, segue personalmente tutte le attivita' dell’organizzazione per unire e celebrare la comunita' italiana.",
      role: "Fondatore",
    },
    {
      name: "Vincenzo",
      imgPath: "/images/vincenzo.jpg",
      description:"Co-fondatore e direttore operativo di Little Italy UK Coordina eventi, progetti e collaborazioni per promuovere la cultura e il Made in Italy nel Regno Unito",
      role: "Co-Founder & Direttore Operativo",
    },
    {
      name: "Tommy",
      imgPath: "/images/tommy.jpg",
      description: "Creo e gestisco contenuti che raccontano la cultura italiana a Londra, valorizzando eventi, partner e sponsor. Mi occupo di strategie creative per aumentare visibilità, coinvolgere la community e mantenere viva l’identità del progetto online.",
      role: "Social Media Manager",
    },
   
  ];

  const collabImgs = [
    {
      name: "Angelica",
      imgPath: "/images/angelica.jpg",
      description:"Angelica svolge un ruolo fondamentale, supportando Little Italy UK nella sua missione di unire la comunita' italiana a Londra e nel Regno Unito. Gestisce le attivita' amministrative, le comunicazioni e la logistica degli eventi, oltre a curare un gruppo WhatsApp per promuovere iniziative di networking e scambio culturale.",
    },
    {
      name: "Nicoletta",
      imgPath: "/images/nicoletta.jpg",
      description:"Vivo a Londra da anni e lavoro come Senior Software Engineer. Amo viaggiare, leggere, ascoltare rock classico, imparare lingue e creare con l’uncinetto, ma la mia vera passione e' la cucina, legata alle mie radici italiane. Collaboro con LittleItalyUK, gestendo i gruppi Italian Food Lovers e Servizi Amministrativi per supportare la comunita' italiana a Londra.",
    },
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
    counterItems,
    expCards,
    expLogos,
    socialImgs,
    teamImgs,
    collabImgs,
    navLinks,
  };