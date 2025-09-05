import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Download,
  Send,
  Monitor,
  Calendar,
  Users,
  Coffee,
  Menu,
  ArrowRight,
  Star,
  Eye,
} from "lucide-react";

export default function PersonalPortfolio() {
  const skills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Python", level: 75, category: "Backend" },
    { name: "UI/UX Design", level: 70, category: "Design" },
    { name: "PostgreSQL", level: 80, category: "Database" },
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      tags: ["Vue.js", "Firebase", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A responsive weather application that provides detailed forecasts, interactive maps, and location-based weather alerts.",
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      tags: ["React", "OpenWeather API", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website with smooth animations, dark mode toggle, and optimized performance.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ];

  const experience = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      description:
        "Led a team of 5 developers in building scalable web applications. Improved application performance by 40% and reduced load times significantly.",
      technologies: ["React", "TypeScript", "GraphQL", "AWS"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations",
      period: "2020 - 2022",
      description:
        "Developed and maintained multiple client projects using modern web technologies. Collaborated with design teams to implement pixel-perfect interfaces.",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Docker"],
    },
    {
      title: "Junior Web Developer",
      company: "StartupXYZ",
      period: "2019 - 2020",
      description:
        "Built responsive websites and web applications. Gained experience in agile development methodologies and version control systems.",
      technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
    },
  ];

  const stats = [
    { number: "20+", label: "Projects Completed", icon: Monitor },
    { number: "3+", label: "Years Experience", icon: Calendar },
    { number: "20+", label: "Happy Clients", icon: Users },
    { number: "500+", label: "Cups of Coffee", icon: Coffee },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "Alex is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CEO at Digital Innovations",
      content:
        "Working with Alex was a pleasure. He brought creative solutions to complex problems and always met our deadlines.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <nav className="navbar bg-base-100/95 backdrop-blur-md absolute top-0 z-50 border-b border-base-300 shadow-lg">
        <div className="container mx-auto">
          <div className="navbar-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-content font-bold text-lg">
                  A
                </span>
              </div>
              <a className="text-xl @md:text-2xl font-bold text-primary">
                Alex Smith
              </a>
            </div>
          </div>

          <div className="navbar-center hidden @lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">
              <li>
                <a
                  href="#home"
                  className="btn btn-ghost btn-sm bg-primary text-primary-content"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="btn btn-ghost btn-sm hover:bg-base-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="btn btn-ghost btn-sm hover:bg-base-200"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="btn btn-ghost btn-sm hover:bg-base-200"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="btn btn-ghost btn-sm hover:bg-base-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="navbar-end">
            <div className="dropdown dropdown-end @lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <Menu className="w-6 h-6" />
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-base-300">
                <li>
                  <a href="#home" className="font-medium">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#experience">Experience</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <a
              href="#contact"
              className="btn btn-primary btn-sm @md:btn-md ml-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid @lg:grid-cols-2 gap-12 @lg:gap-16 items-center">
            <div className="space-y-8 @lg:space-y-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="badge badge-primary badge-lg px-6 py-3 text-sm font-medium">
                    👋 Available for freelance work
                  </div>
                  <h1 className="text-4xl @md:text-5xl @lg:text-6xl @xl:text-7xl font-bold leading-tight">
                    Hi, Im{" "}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Alex Smith
                    </span>
                  </h1>
                  <h2 className="text-xl @md:text-2xl @lg:text-3xl text-base-content/80 font-medium">
                    Full-Stack Developer & UI/UX Designer
                  </h2>
                  <p className="text-base @md:text-lg @lg:text-xl text-base-content/70 max-w-2xl leading-relaxed">
                    I create beautiful, responsive web applications that provide
                    exceptional user experiences. Passionate about clean code
                    and innovative solutions that make a difference.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="btn btn-primary btn-lg @lg:btn-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  >
                    View My Work
                    <ArrowRight className="w-5 h-5 @md:w-6 @md:h-6" />
                  </a>
                  <button className="btn btn-outline btn-lg @lg:btn-xl border-base-content/20 hover:bg-base-content hover:text-base-100">
                    <Download className="w-5 h-5 @md:w-6 @md:h-6" />
                    Download CV
                  </button>
                </div>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="btn btn-circle btn-md btn-outline hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-200"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-circle btn-md btn-outline hover:bg-info hover:text-info-content hover:border-info transition-all duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-circle btn-md btn-outline hover:bg-info hover:text-info-content hover:border-info transition-all duration-200"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-circle btn-md btn-outline hover:bg-error hover:text-error-content hover:border-error transition-all duration-200"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square @lg:aspect-auto @lg:h-96 @xl:h-[600px] relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face"
                  alt="Alex Smith"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-3xl"></div>
                <div className="absolute -bottom-8 -right-8 bg-base-100 p-6 rounded-2xl shadow-xl border border-base-300">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-success rounded-full animate-pulse"></div>
                    <span className="text-base font-bold text-base-content">
                      Available for work
                    </span>
                  </div>
                </div>
                <div className="absolute -top-8 -left-8 bg-base-100 p-6 rounded-2xl shadow-xl border border-base-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3+</div>
                    <div className="text-sm text-base-content/70">
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 @lg:py-16 bg-primary text-primary-content">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6 @lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2 @lg:space-y-4">
                <div className="mx-auto w-12 h-12 @lg:w-16 @lg:h-16 bg-primary-content/20 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 @lg:w-8 @lg:h-8" />
                </div>
                <div className="text-2xl @lg:text-3xl @xl:text-4xl font-bold">
                  {stat.number}
                </div>
                <div className="text-sm @lg:text-base opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 @lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-4">
              About Me
            </h2>
            <p className="text-sm @md:text-base @lg:text-lg text-base-content/70 max-w-3xl mx-auto">
              Im a passionate full-stack developer with over 3 years of
              experience creating digital solutions that make a difference.
            </p>
          </div>

          <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl @lg:text-2xl font-bold">My Journey</h3>
                <p className="text-sm @md:text-base text-base-content/80 leading-relaxed">
                  Started my journey in web development with a curiosity for how
                  things work on the internet. Over the years, Ive honed my
                  skills in both frontend and backend technologies, always
                  staying up-to-date with the latest industry trends.
                </p>
                <p className="text-sm @md:text-base text-base-content/80 leading-relaxed">
                  When Im not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge with the developer community.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 @md:w-5 @md:h-5 text-primary" />
                  <span className="text-sm @md:text-base">
                    San Francisco, CA
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 @md:w-5 @md:h-5 text-primary" />
                  <span className="text-sm @md:text-base">
                    alex@example.com
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl @lg:text-2xl font-bold">
                Skills & Technologies
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm @md:text-base font-medium">
                        {skill.name}
                      </span>
                      <span className="text-xs @md:text-sm text-base-content/60">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 @lg:py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-sm @md:text-base @lg:text-lg text-base-content/70 max-w-3xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              experience.
            </p>
          </div>

          <div className="grid @md:grid-cols-2 gap-6 @lg:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  project.featured ? "@md:col-span-2" : ""
                }`}
              >
                <div
                  className={`${project.featured ? "grid @lg:grid-cols-2 gap-0" : ""}`}
                >
                  <figure
                    className={`${project.featured ? "aspect-video @lg:aspect-auto" : "aspect-video"} overflow-hidden`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </figure>

                  <div className="card-body p-4 @md:p-6">
                    <h3 className="card-title text-lg @md:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-sm @md:text-base text-base-content/80 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 my-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="badge badge-primary badge-sm @md:badge-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="card-actions justify-end">
                      <a
                        href={project.liveUrl}
                        className="btn btn-primary btn-sm @md:btn-md"
                      >
                        <Eye className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="btn btn-outline btn-sm @md:btn-md"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="btn btn-outline btn-sm @md:btn-md @lg:btn-lg">
              View All Projects
              <ExternalLink className="w-4 h-4 @md:w-5 @md:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 @lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-4">
              Work Experience
            </h2>
            <p className="text-sm @md:text-base @lg:text-lg text-base-content/70 max-w-3xl mx-auto">
              My professional journey and the experiences that shaped my career.
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-sm border border-base-200"
              >
                <div className="card-body p-4 @md:p-6">
                  <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg @md:text-xl font-bold text-primary">
                        {exp.title}
                      </h3>
                      <p className="text-sm @md:text-base font-medium text-base-content/80">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 @md:mt-0">
                      <Calendar className="w-4 h-4 text-base-content/60" />
                      <span className="text-sm @md:text-base text-base-content/60">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm @md:text-base text-base-content/80 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="badge badge-outline badge-sm @md:badge-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 @lg:py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-4">
              What People Say
            </h2>
            <p className="text-sm @md:text-base @lg:text-lg text-base-content/70 max-w-3xl mx-auto">
              Feedback from colleagues and clients Ive had the pleasure to work
              with.
            </p>
          </div>

          <div className="grid @md:grid-cols-2 gap-6 @lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body p-4 @md:p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 @md:w-5 @md:h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-sm @md:text-base text-base-content/80 italic mb-4 leading-relaxed">
                    {testimonial.content}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 @md:w-12 @md:h-12 rounded-full">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm @md:text-base">
                        {testimonial.name}
                      </p>
                      <p className="text-xs @md:text-sm text-base-content/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 @lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-sm @md:text-base @lg:text-lg text-base-content/70 max-w-3xl mx-auto">
              Have a project in mind or want to collaborate? Id love to hear
              from you!
            </p>
          </div>

          <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12">
            <div className="space-y-6">
              <h3 className="text-xl @lg:text-2xl font-bold">Lets Connect</h3>
              <p className="text-sm @md:text-base text-base-content/80 leading-relaxed">
                IIm always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 @md:w-12 @md:h-12 bg-primary text-primary-content rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 @md:w-6 @md:h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-sm @md:text-base">Email</p>
                    <p className="text-sm @md:text-base text-base-content/70">
                      alex@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 @md:w-12 @md:h-12 bg-primary text-primary-content rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 @md:w-6 @md:h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-sm @md:text-base">Phone</p>
                    <p className="text-sm @md:text-base text-base-content/70">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 @md:w-12 @md:h-12 bg-primary text-primary-content rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 @md:w-6 @md:h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-sm @md:text-base">
                      Location
                    </p>
                    <p className="text-sm @md:text-base text-base-content/70">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="#"
                  className="btn btn-circle btn-outline btn-sm @md:btn-md"
                >
                  <Github className="w-4 h-4 @md:w-5 @md:h-5" />
                </a>
                <a
                  href="#"
                  className="btn btn-circle btn-outline btn-sm @md:btn-md"
                >
                  <Linkedin className="w-4 h-4 @md:w-5 @md:h-5" />
                </a>
                <a
                  href="#"
                  className="btn btn-circle btn-outline btn-sm @md:btn-md"
                >
                  <Twitter className="w-4 h-4 @md:w-5 @md:h-5" />
                </a>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-200">
              <div className="card-body p-4 @md:p-6">
                <h3 className="card-title text-lg @md:text-xl mb-4">
                  Send Message
                </h3>

                <form className="space-y-4">
                  <div className="grid @md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm @md:text-base">
                          Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="input input-bordered input-sm @md:input-md"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm @md:text-base">
                          Email
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="Your email"
                        className="input input-bordered input-sm @md:input-md"
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm @md:text-base">
                        Subject
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Message subject"
                      className="input input-bordered input-sm @md:input-md"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm @md:text-base">
                        Message
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered textarea-sm @md:textarea-md h-24 @md:h-32"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full btn-sm @md:btn-md"
                  >
                    <Send className="w-4 h-4 @md:w-5 @md:h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col @md:flex-row items-center justify-between gap-4">
            <p className="text-sm @md:text-base text-base-content/70">
              &copy; 2025 Alex Smith. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-sm @md:text-base text-base-content/70 hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm @md:text-base text-base-content/70 hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
