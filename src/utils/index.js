const listOfSchools = [
    {
        schoolName: "Adept College of Professional Studies - Nakuru",
        schoolImage:"../../images/Adept College of Professional Studies - Nakuru.jpg",
    },
    {
        schoolName: "Adventist University of Africa",
        schoolImage:"../../images/Adventist University of Africa.png",
    },
    {
        schoolName: "Africa Digital Media Institute - ADMI",
        schoolImage:"../../images/Africa Digital Media Institute - ADMI.png",
    },
    {
        schoolName: "Africa International University",
        schoolImage:"../../images/Africa International University.png",
    },
    {
        schoolName: "Africa Nazarene University",
        schoolImage:"../../images/Africa Nazarene University.jpeg",
    },
    {
        schoolName: "African Institute of Research and Development Studies, Bandari College",
        schoolImage:"../../images/African Institute of Research and Development Studies, Bandari College.png",
    },
    {
        schoolName: "African Institute of Research and Development Studies",
        schoolImage:"../../images/African Institute of Research and Development Studies.jpg",
    },
    {
        schoolName: "Aga Khan University Teaching Hospital",
        schoolImage:"../../images/Aga Khan University Teaching Hospital.jpg",
    },
    {
        schoolName: "Aga Khan University",
        schoolImage:"../../images/Aga Khan University.png",
    },
    {
        schoolName: "AirSwiss International College - Nairobi",
        schoolImage:"../../images/AirSwiss International College - Nairobi.jpg",
    },
    {
        schoolName: "Airways Travel Institute",
        schoolImage:"../../images/Airways Travel Institute.png",
    },
    {
        schoolName: "Alphax College - Eldoret",
        schoolImage:"../../images/Alphax College - Eldoret.png",
    },
    {
        schoolName: "Amani College",
        schoolImage:"../../images/Amani College.png",
    },
    {
        schoolName: "Amboseli Institute of Hospitality and Technology - Thika, Nakuru",
        schoolImage:"../../images/Amboseli Institute of Hospitality and Technology - Thika, Nakuru.jpg",
    },
    {
        schoolName: "Amref International University (AMIU)",
        schoolImage:"../../images/Amref International University (AMIU).png",
    },
    {
        schoolName: "Associated Computer Services - Development House, Nairobi",
        schoolImage:"../../images/Associated Computer Services - Development House, Nairobi.webp",
    },
    {
        schoolName: "Baraton Teachers_ Training College - Nandi Central Kapsabet",
        schoolImage:"../../images/Baraton Teachers_ Training College - Nandi Central Kapsabet.jpg",
    },
    {
        schoolName: "Bell Institute of Technology - Nairobi",
        schoolImage:"../../images/Bell Institute of Technology - Nairobi.jpg",
    },
    {
        schoolName: "Belmont International College-Ongata Rongai - Kajiado",
        schoolImage:"../../images/Belmont International College-Ongata Rongai - Kajiado.webp",
    },
    {
        schoolName: "Bible College of East Africa, Kasarani - Nairobi",
        schoolImage:"../../images/Bible College of East Africa, Kasarani - Nairobi.png",
    },
    {
        schoolName: "Bungoma Technical Training Institute - Bungoma",
        schoolImage:"../../images/Bungoma Technical Training Institute - Bungoma.jpg",
    },
    {
        schoolName: "Career Training Centre - Nairobi",
        schoolImage:"../../images/Career Training Centre - Nairobi.jpg",
    },
    {
        schoolName: "Cascade Institute of Hospitality - Thika",
        schoolImage:"../../images/Cascade Institute of Hospitality - Thika.jpg",
    },
    {
        schoolName: "Catholic University of Eastern Africa (CUEA)",
        schoolImage:"../../images/Catholic University of Eastern Africa (CUEA).png",
    },
    {
        schoolName: "Chuka University",
        schoolImage:"../../images/Chuka University.png",
    },
    {
        schoolName: "Coast Institute of Technology",
        schoolImage:"../../images/Coast Institute of Technology.png",
    },
    {
        schoolName: "Computer Learning Centre (CLC) - Nairobi",
        schoolImage:"../../images/Computer Learning Centre (CLC) - Nairobi.png",
    },
    {
        schoolName: "Computer Pride Training Centre - Nairobi",
        schoolImage:"../../images/Computer Pride Training Centre - Nairobi.png",
    },
    {
        schoolName: "Consolata Cathedral Institute -Nyeri",
        schoolImage:"../../images/Consolata Cathedral Institute -Nyeri.png",
    },
    {
        schoolName: "Consolata Institute of Communication and Technology - Nyeri-Mathari",
        schoolImage:"../../images/Consolata Institute of Communication and Technology - Nyeri-Mathari.png",
    },
    {
        schoolName: "Daystar University",
        schoolImage:"../../images/Daystar University.png",
    },
    {
        schoolName: "Dedan Kimathi University of Technology",
        schoolImage:"../../images/Dedan Kimathi University of Technology.png",
    },
    {
        schoolName: "Eagle Air Aviation College (EAAC) - Ongata Rongai",
        schoolImage:"../../images/Eagle Air Aviation College (EAAC) - Ongata Rongai.png",
    },
    {
        schoolName: "East Africa Institute of Certified Studies - Nairobi",
        schoolImage:"../../images/East Africa Institute of Certified Studies - Nairobi.png",
    },
    {
        schoolName: "East Africa Vision Institute",
        schoolImage:"../../images/East Africa Vision Institute.jpg",
    },
    {
        schoolName: "East African School of Aviation - Embakasi, Nairobi",
        schoolImage:"../../images/East African School of Aviation - Embakasi, Nairobi.jpg",
    },
    {
        schoolName: "Egerton University",
        schoolImage:"../../images/Egerton University.png",
    },
    {
        schoolName: "Eldoret Aviation Training Institute",
        schoolImage:"../../images/Eldoret Aviation Training Institute.png",
    },
    {
        schoolName: "Eldoret Polytechnic",
        schoolImage:"../../images/Eldoret Polytechnic.jpg",
    },
    {
        schoolName: "ELDORET TECHNICAL TRAINING INSTITUTE",
        schoolImage:"../../images/ELDORET TECHNICAL TRAINING INSTITUTE.jpg",
    },
    {
        schoolName: "Emma Daniel Arts Training Institute (EDATI)",
        schoolImage:"../../images/Emma Daniel Arts Training Institute (EDATI).jpg",
    },
    {
        schoolName: "German Institute of Professional Studies - Nairobi",
        schoolImage:"../../images/German Institute of Professional Studies - Nairobi.png",
    },
    {
        schoolName: "Government Training Institute (GTI)",
        schoolImage:"../../images/Government Training Institute (GTI).jpg",
    },
    {
        schoolName: "Graffins College - Westlands, Nairobi",
        schoolImage:"../../images/Graffins College - Westlands, Nairobi.png",
    },
    {
        schoolName: "Great Lakes University of Kisumu",
        schoolImage:"../../images/Great Lakes University of Kisumu.png",
    },
    {
        schoolName: "Gretsa University",
        schoolImage:"../../images/Gretsa University.png",
    },
    {
        schoolName: "Gusii Institute of Technology",
        schoolImage:"../../images/Gusii Institute of Technology.jpg",
    },
    {
        schoolName: "Harvard Institute of Development Studies - Thika",
        schoolImage:"../../images/Harvard Institute of Development Studies - Thika.jpg",
    },
    {
        schoolName: "Hemland College of Professional and Technical Studies - Thika",
        schoolImage:"../../images/Hemland College of Professional and Technical Studies - Thika.png",
    },
    {
        schoolName: "Holy Rosary College - Tala",
        schoolImage:"../../images/Holy Rosary College - Tala.jpg",
    },
    {
        schoolName: "ICT Fire and Rescue - Thika",
        schoolImage:"../../images/ICT Fire and Rescue - Thika.jpg",
    },
    {
        schoolName: "Indian Institute of Hardware Technology- IIHT Westlands, Nairobi",
        schoolImage:"../../images/Indian Institute of Hardware Technology- IIHT Westlands, Nairobi.png",
    },
    {
        schoolName: "Institute of Advanced Technology - Loita House, Loita Street, Buruburu, Nairobi",
        schoolImage:"../../images/Institute of Advanced Technology - Loita House, Loita Street, Buruburu, Nairobi.jpg",
    },
    {
        schoolName: "International Centre of Technology (ICT-Thika) - Thika",
        schoolImage:"../../images/International Centre of Technology (ICT-Thika) - Thika.png",
    },
    {
        schoolName: "Intraglobal Training Institute -Nairobi CBD",
        schoolImage:"../../images/Intraglobal Training Institute -Nairobi CBD.png",
    },
    {
        schoolName: "Jaffery Institute of Professional Studies[22] - Mombasa",
        schoolImage:"../../images/Jaffery Institute of Professional Studies[22] - Mombasa.png",
    },
    {
        schoolName: "Jomo Kenyatta University of Agriculture and Technology",
        schoolImage:"../../images/Jomo Kenyatta University of Agriculture and Technology.png",
    },
    {
        schoolName: "K.A.G East University",
        schoolImage:"../../images/K.A.G East University.jpg",
    },
    {
        schoolName: "Kabarak University",
        schoolImage:"../../images/Kabarak University.png",
    },
    {
        schoolName: "Kabete National Polytechnic",
        schoolImage:"../../images/Kabete National Polytechnic.png",
    },
    {
        schoolName: "Kagumo College",
        schoolImage:"../../images/Kagumo College.png",
    },
    {
        schoolName: "Kaiboi Technical Training Institute",
        schoolImage:"../../images/Kaiboi Technical Training Institute.png",
    },
    {
        schoolName: "Karatina University",
        schoolImage:"../../images/Karatina University.png",
    },
    {
        schoolName: "KCA University",
        schoolImage:"../../images/KCA University.png",
    },
    {
        schoolName: "Kenya Christian Industrial Training Institute- KCITI",
        schoolImage:"../../images/Kenya Christian Industrial Training Institute- KCITI.png",
    },
    {
        schoolName: "Kenya Forestry College",
        schoolImage:"../../images/Kenya Forestry College.jpg",
    },
    {
        schoolName: "Kenya Forestry Research Institute",
        schoolImage:"../../images/Kenya Forestry Research Institute.png",
    },
    {
        schoolName: "Kenya Highlands University (KHU)",
        schoolImage:"../../images/Kenya Highlands University (KHU).png",
    },
    {
        schoolName: "Kenya Institute of Development Studies (K.I.D.S.) - Nairobi",
        schoolImage:"../../images/Kenya Institute of Development Studies (K.I.D.S.) - Nairobi.jpg",
    },
    {
        schoolName: "Kenya Institute of Highways and Building Technology (KIHBT)- Nairobi",
        schoolImage:"../../images/Kenya Institute of Highways and Building Technology (KIHBT)- Nairobi.jpg",
    },
    {
        schoolName: "Kenya Institute of Management (KIM)",
        schoolImage:"../../images/Kenya Institute of Management (KIM).webp",
    },
    {
        schoolName: "Kenya Institute of Mass Communication",
        schoolImage:"../../images/Kenya Institute of Mass Communication.png",
    },
    {
        schoolName: "Kenya Institute of Monitoring and Evaluation Studies (KIMES)",
        schoolImage:"../../images/Kenya Institute of Monitoring and Evaluation Studies (KIMES).jpg",
    },
    {
        schoolName: "Kenya Institute of Software Engineering",
        schoolImage:"../../images/Kenya Institute of Software Engineering.jpg",
    },
    {
        schoolName: "Kenya Institute of Special Education (KISE) - Kasarani, Nairobi",
        schoolImage:"../../images/Kenya Institute of Special Education (KISE) - Kasarani, Nairobi.jpg",
    },
    {
        schoolName: "Kenya Medical Training Centre (KMTC)",
        schoolImage:"../../images/Kenya Medical Training Centre (KMTC).jpg",
    },
    {
        schoolName: "Kenya Methodist University",
        schoolImage:"../../images/Kenya Methodist University.png",
    },
    {
        schoolName: "Kenya School of Government",
        schoolImage:"../../images/Kenya School of Government.png",
    },
    {
        schoolName: "Kenya School of Medical Science and Technology",
        schoolImage:"../../images/Kenya School of Medical Science and Technology.png",
    },
    {
        schoolName: "Kenya School of Monetary Studies",
        schoolImage:"../../images/Kenya School of Monetary Studies.jpg",
    },
    {
        schoolName: "Kenya School of Professional Studies (KSPS)",
        schoolImage:"../../images/Kenya School of Professional Studies (KSPS).png",
    },
    {
        schoolName: "Kenya Technical Teachers College (KTTC)",
        schoolImage:"../../images/Kenya Technical Teachers College (KTTC).jpg",
    },
    {
        schoolName: "Kenya Utalii College - Nairobi",
        schoolImage:"../../images/Kenya Utalii College - Nairobi.jpg",
    },
    {
        schoolName: "Kenya Water Institute",
        schoolImage:"../../images/Kenya Water Institute.jpg",
    },
    {
        schoolName: "Kenya Wildlife Service Training Institute",
        schoolImage:"../../images/Kenya Wildlife Service Training Institute.jpg",
    },
    {
        schoolName: "Kenyatta University",
        schoolImage:"../../images/Kenyatta University.png",
    },
    {
        schoolName: "Kiambu Institute of Science and Technology",
        schoolImage:"../../images/Kiambu Institute of Science and Technology.png",
    },
    {
        schoolName: "Kibabii University",
        schoolImage:"../../images/Kibabii University.png",
    },
    {
        schoolName: "Kigari Teachers College - Embu",
        schoolImage:"../../images/Kigari Teachers College - Embu.png",
    },
    {
        schoolName: "Kipkabus Technical and Vocational College (KTVC)",
        schoolImage:"../../images/Kipkabus Technical and Vocational College (KTVC).png",
    },
    {
        schoolName: "Kirinyaga University",
        schoolImage:"../../images/Kirinyaga University.png",
    },
    {
        schoolName: "Kiriri Women_s University of Science and Technology",
        schoolImage:"../../images/Kiriri Women_s University of Science and Technology.jpg",
    },
    {
        schoolName: "Kisii University",
        schoolImage:"../../images/Kisii University.png",
    },
    {
        schoolName: "Kisumu Polytechnic - Makasembo",
        schoolImage:"../../images/Kisumu Polytechnic - Makasembo.png",
    },
    {
        schoolName: "Kitale Technical Institute",
        schoolImage:"../../images/Kitale Technical Institute.png",
    },
    {
        schoolName: "Laikipia University",
        schoolImage:"../../images/Laikipia University.png",
    },
    {
        schoolName: "Lukenya University",
        schoolImage:"../../images/Lukenya University.png",
    },
    {
        schoolName: "Maasai Mara University",
        schoolImage:"../../images/Maasai Mara University.png",
    },
    {
        schoolName: "Machakos Institute of Technology - Machakos",
        schoolImage:"../../images/Machakos Institute of Technology - Machakos.png",
    },
    {
        schoolName: "Machakos University",
        schoolImage:"../../images/Machakos University.png",
    },
    {
        schoolName: "Management University of Africa",
        schoolImage:"../../images/Management University of Africa.png",
    },
    {
        schoolName: "Maseno University",
        schoolImage:"../../images/Maseno University.png",
    },
    {
        schoolName: "Masinde Muliro University of Science and Technology",
        schoolImage:"../../images/Masinde Muliro University of Science and Technology.png",
    },
    {
        schoolName: "Mboya Labour College - Kisumu",
        schoolImage:"../../images/Mboya Labour College - Kisumu.png",
    },
    {
        schoolName: "Meru University of Science and Technology",
        schoolImage:"../../images/Meru University of Science and Technology.jpg",
    },
    {
        schoolName: "Michuki Technical Institute - Muranga",
        schoolImage:"../../images/Michuki Technical Institute - Muranga.png",
    },
    {
        schoolName: "Moi University",
        schoolImage:"../../images/Moi University.png",
    },
    {
        schoolName: "Mount Kenya University",
        schoolImage:"../../images/Mount Kenya University.png",
    },
    {
        schoolName: "Multimedia University of Kenya",
        schoolImage:"../../images/Multimedia University of Kenya.png",
    },
    {
        schoolName: "Murang_a University of Technology",
        schoolImage:"../../images/Murang_a University of Technology.png",
    },
    {
        schoolName: "Nairobi Aviation College - Kisumu Campus",
        schoolImage:"../../images/Nairobi Aviation College - Kisumu Campus.png",
    },
    {
        schoolName: "Nairobi Industrial Institute Collage",
        schoolImage:"../../images/Nairobi Industrial Institute Collage.jpg",
    },
    {
        schoolName: "Nakuru Counseling _ Training Institute - Nakuru",
        schoolImage:"../../images/Nakuru Counseling _ Training Institute - Nakuru.jpg",
    },
    {
        schoolName: "Pan Africa Christian University",
        schoolImage:"../../images/Pan Africa Christian University.png",
    },
    {
        schoolName: "PC Kinyanjui Technical Training Institute (PCKTTI)",
        schoolImage:"../../images/PC Kinyanjui Technical Training Institute (PCKTTI).png",
    },
    {
        schoolName: "Presbyterian University of East Africa",
        schoolImage:"../../images/Presbyterian University of East Africa.jpg",
    },
    {
        schoolName: "Pwani University",
        schoolImage:"../../images/Pwani University.png",
    },
    {
        schoolName: "Railway Training Institute - South B, Nairobi",
        schoolImage:"../../images/Railway Training Institute - South B, Nairobi.jpg",
    },
    {
        schoolName: "Ramogi Institute of Advanced Technology - Kisumu",
        schoolImage:"../../images/Ramogi Institute of Advanced Technology - Kisumu.png",
    },
    {
        schoolName: "Riara University",
        schoolImage:"../../images/Riara University.jpg",
    },
    {
        schoolName: "Rift Valley Institute of Science _ Technology - Nakuru",
        schoolImage:"../../images/Rift Valley Institute of Science _ Technology - Nakuru.png",
    },
    {
        schoolName: "Rift Valley Technical Training Institute - Nakuru",
        schoolImage:"../../images/Rift Valley Technical Training Institute - Nakuru[24].jpg",
    },
    {
        schoolName: "Sacred Training Institute - Bungoma and Nairobi Campuses",
        schoolImage:"../../images/Sacred Training Institute - Bungoma and Nairobi Campuses.jpg",
    },
    {
        schoolName: "Sacred Training Institute",
        schoolImage:"../../images/Sacred Training Institute.jpg",
    },
    {
        schoolName: "Savannah Institute for Business and Informatics - Nakuru",
        schoolImage:"../../images/Savannah Institute for Business and Informatics - Nakuru.jpg",
    },
    {
        schoolName: "Scott Christian University",
        schoolImage:"../../images/Scott Christian University.png",
    },
    {
        schoolName: "Sensei Institute of Technology for Plant Operator Training",
        schoolImage:"../../images/Sensei Institute of Technology for Plant Operator Training.png",
    },
    {
        schoolName: "South Eastern Kenya University",
        schoolImage:"../../images/South Eastern Kenya University.png",
    },
    {
        schoolName: "St. Paul_s University",
        schoolImage:"../../images/St. Paul_s University.png",
    },
    {
        schoolName: "Strathmore University",
        schoolImage:"../../images/Strathmore University.png",
    },
    {
        schoolName: "Technical Training Institute (MTTI) - Mombasa",
        schoolImage:"../../images/Technical Training Institute (MTTI) - Mombasa.png",
    },
    {
        schoolName: "Technical University of Mombasa",
        schoolImage:"../../images/Technical University of Mombasa.png",
    },
    {
        schoolName: "The East African University",
        schoolImage:"../../images/The East African University.jpg",
    },
    {
        schoolName: "The Thika Technical Training Institute - Thika",
        schoolImage:"../../images/The Thika Technical Training Institute - Thika.png",
    },
    {
        schoolName: "Umma University (UMMA)",
        schoolImage:"../../images/Umma University (UMMA).png",
    },
    {
        schoolName: "United Africa College - Nairobi",
        schoolImage:"../../images/United Africa College - Nairobi.jpg",
    },
    {
        schoolName: "United States International University Africa (USIU - Africa)",
        schoolImage:"../../images/United States International University Africa (USIU - Africa).png",
    },
    {
        schoolName: "University of Eastern Africa, Baraton",
        schoolImage:"../../images/University of Eastern Africa, Baraton.jpg",
    },
    {
        schoolName: "University of Eldoret",
        schoolImage:"../../images/University of Eldoret.png",
    },
    {
        schoolName: "University of Kabianga",
        schoolImage:"../../images/University of Kabianga.jpg",
    },
    {
        schoolName: "University of Nairobi",
        schoolImage:"../../images/University of Nairobi.jpeg",
    },
    {
        schoolName: "Uzima University College (constituent college of CUEA)",
        schoolImage:"../../images/Uzima University College (constituent college of CUEA).png",
    },
    {
        schoolName: "Vision Empowerment Training Institute- Nairobi",
        schoolImage:"../../images/Vision Empowerment Training Institute- Nairobi.png",
    },
    {
        schoolName: "Vision Stars Training Institute - Nairobi",
        schoolImage:"../../images/Vision Stars Training Institute - Nairobi.jpg",
    },
    {
        schoolName: "Zetech University",
        schoolImage:"../../public/images/Zetech University.png",
    }
]

export default listOfSchools;