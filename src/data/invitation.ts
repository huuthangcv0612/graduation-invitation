export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface BuildingInfo {
  id: string;
  name: string;
  code: string;
  floor: string;
  room: string;
  description: string;
  isDestination?: boolean;
}

export const invitationData = {
  person: {
    name: "NGUYỄN HỮU THẮNG",
    shortName: "Hữu Thắng",
    title: "Kỹ sư Công nghệ Phần mềm",
    degree: "Bằng Kỹ sư Công nghệ Thông tin & Phần mềm",
    university: "Trường Đại học Xây dựng Hà Nội",
    shortUniversity: "HUCE / NUCE",
    avatar: "/images/portrait.svg",
  },

  event: {
    title: "LỄ TỐT NGHIỆP KỸ SƯ",
    subtitle: "CÔNG NGHỆ PHẦN MỀM",
    date: "30 / 10 / 2026",
    rawDate: "2026-10-30",
    time: "14:55",
    targetIsoDate: "2026-10-30T14:55:00+07:00",
    location: "Trường Đại học Xây dựng Hà Nội",
    address: "Số 55 Giải Phóng, Phường Đồng Tâm, Q. Hai Bà Trưng, Hà Nội",
    room: "Phòng 112.H1",
    building: "Tòa nhà H1",
  },

  message: {
    salutation: "Thân gửi những người bạn thân yêu,",
    body: [
      "Sau một hành trình dài với rất nhiều kỷ niệm, những đêm thức khuya, những bài tập, những dự án và những khoảnh khắc đáng nhớ...",
      "Mình đã chính thức hoàn thành hành trình đại học và nhận bằng Kỹ sư Công nghệ Phần mềm tại Trường Đại học Xây dựng Hà Nội.",
      "Mình rất vui và hạnh phúc nếu bạn có thể dành chút thời gian quý báu đến chung vui và lưu lại khoảnh khắc đặc biệt này cùng mình."
    ],
    closing: "Sự hiện diện của bạn là món quà ý nghĩa nhất đối với mình."
  },

  map: {
    latitude: 20.9997,
    longitude: 105.8415,
    placeName: "Trường Đại học Xây dựng Hà Nội (HUCE)",
    address: "55 Giải Phóng, Hai Bà Trưng, Hà Nội",
    googleMapsUrl: "https://maps.google.com/?q=20.9997,105.8415",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=20.9997,105.8415",
    // Clean embed map URL for HUCE
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6978453472017!2d105.8407421759978!3d20.99973888960144!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac7738b5f393%3A0xb7a4e6b1897d266a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBYw6J5IGTuZyBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
  },

  campusMap: {
    destinationBuilding: "Tòa H1",
    destinationRoom: "Phòng 112.H1",
    routeSteps: [
      { step: 1, name: "CỔNG TRƯỜNG", detail: "55 Giải Phóng" },
      { step: 2, name: "SÂN TRƯỜNG TRỤC CHÍNH", detail: "Đi thẳng qua khoảng sân trung tâm" },
      { step: 3, name: "TÒA H1", detail: "Tòa nhà giảng đường chính" },
      { step: 4, name: "PHÒNG 112.H1 ⭐", detail: "Tầng 1 - Phòng Lễ Tốt Nghiệp" }
    ],
    buildings: [
      {
        id: "h1",
        name: "Tòa nhà H1",
        code: "H1",
        floor: "Tầng 1",
        room: "Phòng 112.H1",
        description: "Địa điểm chính diễn ra Lễ Tốt Nghiệp & Trao Bằng",
        isDestination: true,
      },
      {
        id: "h2",
        name: "Tòa nhà H2",
        code: "H2",
        floor: "Tầng 1 - 5",
        room: "Khu Giảng đường H2",
        description: "Tòa giảng đường phía sau H1",
        isDestination: false,
      },
      {
        id: "thu-vien",
        name: "Thư viện Trung tâm",
        code: "TV",
        floor: "Khu A",
        room: "Trung tâm Thông tin Thư viện",
        description: "Thư viện Đại học Xây dựng",
        isDestination: false,
      },
      {
        id: "san-truong",
        name: "Sân trung tâm & Quảng trường",
        code: "SÂN",
        floor: "Trục chính",
        room: "Khu vực check-in chụp ảnh ngoài trời",
        description: "Sân trường nơi các tân kỹ sư chụp ảnh lưu niệm",
        isDestination: false,
      },
    ] as BuildingInfo[]
  },

  timeline: [
    {
      year: "2022",
      title: "Bắt Đầu Hành Trình",
      description: "Chính thức nhập học ngành Công nghệ Phần mềm tại DHXD Hà Nội (HUCE), bước vào thế giới lập trình và kỹ thuật phần mềm."
    },
    {
      year: "2023",
      title: "Chinh Phục Kiến Thức",
      description: "Vượt qua những môn đại cương khó nhằn, xây dựng những dòng code đầu tiên, kết bạn cùng những người đồng đội tuyệt vời."
    },
    {
      year: "2024",
      title: "Dự Án & Thực Tế",
      description: "Tham gia phát triển các dự án phần mềm thực tế, làm chủ các công nghệ web hiện đại, thuật toán và kiến trúc phần mềm."
    },
    {
      year: "2025",
      title: "Đồ Án Tốt Nghiệp",
      description: "Dành trọn tâm huyết cho Đồ án Tốt nghiệp Kỹ sư, bảo vệ thành công trước Hội đồng Giám khảo chuyên môn."
    },
    {
      year: "2026",
      title: "🎓 Lễ Tốt Nghiệp",
      description: "Chính thức nhận bằng Kỹ sư Công nghệ Phần mềm, khép lại chặng đường sinh viên rực rỡ và mở ra tương lai mới."
    }
  ] as TimelineItem[],

  gallery: [
    {
      id: "mem-1",
      src: "/images/graduation-01.svg",
      alt: "Khoảnh khắc Lễ tốt nghiệp",
      caption: "Khoảnh khắc tự hào ngày nhận bằng Kỹ sư",
      aspectRatio: "portrait"
    },
    {
      id: "mem-2",
      src: "/images/graduation-02.svg",
      alt: "Kỷ niệm cùng thầy cô và bạn bè",
      caption: "Cùng những người bạn đồng hành suốt 4 năm đại học",
      aspectRatio: "landscape"
    },
    {
      id: "mem-3",
      src: "/images/graduation-03.svg",
      alt: "Khuôn viên Trường Đại học Xây dựng",
      caption: "Góc sân trường HUCE thân thương chứa đầy kỷ niệm",
      aspectRatio: "square"
    },
    {
      id: "mem-4",
      src: "/images/graduation-04.svg",
      alt: "Áo cử nhân tốt nghiệp",
      caption: "Trang phục Lễ tốt nghiệp cử nhân & kỹ sư",
      aspectRatio: "portrait"
    },
    {
      id: "mem-5",
      src: "/images/graduation-05.svg",
      alt: "Những đêm thức làm đồ án tốt nghiệp",
      caption: "Những đêm thức cùng dòng code và đồ án tốt nghiệp",
      aspectRatio: "landscape"
    },
    {
      id: "mem-6",
      src: "/images/graduation-06.svg",
      alt: "Nụ cười ngày nhận bằng",
      caption: "Sự hiện diện của bạn là niềm vui trọn vẹn nhất",
      aspectRatio: "square"
    }
  ] as GalleryItem[],

  music: {
    src: "/music/background.mp3",
    title: "Graduation Acoustic Theme",
    artist: "Antigravity Sound",
  }
};
