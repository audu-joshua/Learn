"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { BookOpen, GraduationCap, Users, Video, CheckCircle, School } from "lucide-react"
import { ChatbotButton } from "@/components/chatbot-button"
import { motion } from "framer-motion"

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const getColorClasses = (color: string) => {  
    switch (color) {
      case "blue":
        return {
          cardBg: "bg-blue-50",
          iconBg: "bg-blue-100",
          iconText: "text-blue-600",
          titleText: "text-blue-700",
          buttonBg: "bg-blue-600 hover:bg-blue-700",
          buttonOutline: "border-blue-600 text-blue-600 hover:bg-blue-50"
        };
      case "green":
        return {
          cardBg: "bg-green-50",
          iconBg: "bg-green-100",
          iconText: "text-green-600",
          titleText: "text-green-700",
          buttonBg: "bg-green-600 hover:bg-green-700",
          buttonOutline: "border-green-600 text-green-600 hover:bg-green-50"
        };
      case "red":
        return {
          cardBg: "bg-red-50",
          iconBg: "bg-red-100",
          iconText: "text-red-600",
          titleText: "text-red-700",
          buttonBg: "bg-red-600 hover:bg-red-700",
          buttonOutline: "border-red-600 text-red-600 hover:bg-red-50"
        };
      default:
        return {
          cardBg: "bg-card",
          iconBg: "bg-primary-100",
          iconText: "text-primary",
          titleText: "text-card-foreground",
          buttonBg: "bg-primary hover:bg-primary/90",
          buttonOutline: "border-primary text-primary hover:bg-primary/10"
        };
    }
  };

  const examTypes = [
    {
      title: "Common Entrance",
      description:
        "Comprehensive preparation for primary school students seeking admission to secondary schools",
      icon: <School className="h-8 w-8" />,
      color: "blue",
    },
    {
      title: "WAEC/NECO",
      description: "Targeted preparation for Junior and Senior WAEC/NECO examinations with past questions",
      icon: <BookOpen className="h-8 w-8" />,
      color: "green",
    },
    {
      title: "JAMB/UTME",
      description: "Intensive preparation for university entrance exams with CBT practice and simulations",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "red",
    },
  ];


  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-700 to-purple-600 text-white py-20">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
  {/* Background Image */}
  <Image
    src="/africankid.jpg"
    alt="African boy Studying"
    layout="fill"
    objectFit="cover"
    priority
  />
  
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/10"></div>
</div>


  <div className="container mx-auto px-6 text-center relative z-10">
    <motion.h1
      className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      Ace Your Exams with Confidence
    </motion.h1>
    <motion.p
      className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      The complete local solution for Common Entrance, WAEC, JAMB, and more. Learn from expert teachers in your
      school and practice with exam-focused content.
    </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button className="bg-yellow-500 text-purple-900 hover:bg-yellow-400 text-lg px-8 py-6 font-bold shadow-lg transition-all hover:scale-105">
              Start Learning Now
            </Button>
            <Button className="bg-white text-purple-900 hover:bg-gray-100 border-2 border-white text-lg px-8 py-6 font-bold shadow-lg transition-all hover:scale-105">
              For Schools
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: "10k+", label: "Students" },
              { number: "500+", label: "Schools" },
              { number: "95%", label: "Pass Rate" },
              { number: "50k+", label: "Practice Questions" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-purple-800/70 p-4 rounded-lg shadow-md hover:bg-purple-700/90 transition-all"
                variants={scaleIn}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl mb-2 font-bold">{stat.number}</div>
                <div className="text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Exam Types Section */}
      <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fadeIn">
        <motion.span 
              className="inline-block px-3 py-1 text-sm font-medium text-purple-900 bg-purple-100 rounded-full mb-4"
              initial={fadeIn.hidden}
              whileInView={fadeIn.visible}
              viewport={{ once: true }}
            >
              Comprehensive Preparation
            </motion.span>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground/90">
            Prepare for Any Exam
          </h3>
          <p className="text-lg text-muted-foreground">
            Tailored resources and practice tests for every examination type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {examTypes.map((exam, index) => {
            const colors = getColorClasses(exam.color);
            
            return (
              <div 
                key={index} 
                className={`exam-card ${colors.cardBg} rounded-xl p-6 border border-border shadow-sm flex flex-col items-center text-center`}
              >
                <div className={`icon-container h-16 w-16 rounded-full flex items-center justify-center mb-4 ${colors.iconBg} ${colors.iconText}`}>
                  {exam.icon}
                </div>

                <h3 className={`text-xl font-semibold mb-2 ${colors.titleText}`}>
                  {exam.title}
                </h3>

                <p className="text-muted-foreground mb-6 flex-grow">
                  {exam.description}
                </p>

                <Button 
                  variant="outline" 
                  className={colors.buttonOutline}
                >
                  Learn More
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>

      {/* Features Section */}
      {/* Features Section - Kid-Friendly Bold Redesign */}
<section className="py-16 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 text-white">
  <div className="container mx-auto px-6">
    <motion.div
      className="text-center mb-12"
      initial={fadeIn.hidden}
      whileInView={fadeIn.visible}
      viewport={{ once: true }}
    >
      <span className="inline-block px-4 py-1 text-sm font-bold text-purple-900 bg-yellow-400 rounded-full mb-4 shadow-md">
        Our Promise
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose ExamPrep</h2>
      <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
    </motion.div>

    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        {
          title: "Exam-Focused Content",
          description: "Curriculum aligned with local examination standards",
          icon: <BookOpen className="h-7 w-7" />,
          color: "bg-yellow-400 text-purple-900",
          bgColor: "from-yellow-300/20 to-yellow-400/20"
        },
        {
          title: "School Teacher Videos",
          description: "Learn from familiar teachers through fun video lessons",
          icon: <Video className="h-7 w-7" />,
          color: "bg-blue-400 text-purple-900",
          bgColor: "from-blue-300/20 to-blue-400/20"
        },
        {
          title: "Past Questions",
          description: "Practice with thousands of past exam questions",
          icon: <CheckCircle className="h-7 w-7" />,
          color: "bg-green-400 text-purple-900",
          bgColor: "from-green-300/20 to-green-400/20"
        },
        {
          title: "School Integration",
          description: "Schools can track progress and support students",
          icon: <Users className="h-7 w-7" />,
          color: "bg-red-400 text-purple-900",
          bgColor: "from-red-300/20 to-red-400/20"
        },
      ].map((feature, index) => (
        <motion.div
          key={index}
          className={`bg-gradient-to-br ${feature.bgColor} p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all group`}
          variants={fadeIn}
          whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
        >
          <div className={`${feature.color} w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md transform group-hover:rotate-6 transition-all`}>
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors">{feature.title}</h3>
          <p className="text-white/80 text-sm">{feature.description}</p>
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all">
            <span className="text-yellow-300 text-xs font-bold flex items-center">
              LEARN MORE 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* CTA Section */}
      {/* Ready to Excel Section with Light Background and Minimal Design */}
{/* Ready to Excel Section - With Floating Shapes Animation */}
<section className="relative py-20 overflow-hidden bg-gray-50">
  {/* Animated Floating Shapes Background - Spread throughout the section */}
  <div className="absolute inset-0 z-0">
    {/* Top left shape */}
    <motion.div
      className="absolute h-20 w-20 rounded-full bg-purple-200/40 top-10 left-[10%]"
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Bottom right shape */}
    <motion.div
      className="absolute h-16 w-16 rounded-md bg-yellow-200/40 bottom-20 right-[15%]"
      animate={{
        y: [0, 20, 0],
        rotate: [0, -5, 0],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Center right shape */}
    <motion.div
      className="absolute h-24 w-24 rotate-45 bg-blue-200/30 top-[30%] right-[30%]"
      animate={{
        x: [0, 20, 0],
        rotate: [45, 55, 45],
      }}
      transition={{
        duration: 11,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Bottom left shape */}
    <motion.div
      className="absolute h-28 w-28 rounded-full bg-green-200/30 bottom-[10%] left-[20%]"
      animate={{
        x: [0, -15, 0],
        y: [0, 10, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Center left shape */}
    <motion.div
      className="absolute h-14 w-14 rounded-lg bg-red-200/30 top-[40%] left-[25%]"
      animate={{
        y: [0, -15, 0],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Top right shape */}
    <motion.div
      className="absolute h-18 w-18 rounded-full bg-indigo-200/30 top-[15%] right-[10%]"
      animate={{
        x: [0, 15, 0],
        y: [0, 10, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    {/* Central shape */}
    <motion.div
      className="absolute h-16 w-16 rounded-full bg-pink-200/20 top-[50%] left-[50%]"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="text-center mb-12">
      <motion.span 
        className="inline-block px-4 py-1 text-sm font-bold text-purple-800 bg-purple-100 rounded-full mb-4 shadow-sm"
        initial={fadeIn.hidden}
        whileInView={fadeIn.visible}
        viewport={{ once: true }}
      >
        Start Your Journey
      </motion.span>
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-3 text-purple-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Ready to Excel in Your Exams?
      </motion.h2>
      <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
      <motion.p
        className="text-lg text-gray-700 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Join thousands of students who have improved their exam scores with our fun, 
        engaging, and effective learning platform.
      </motion.p>
    </div>

    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <Button className="bg-yellow-500 text-purple-900 hover:bg-yellow-400 text-lg px-8 py-6 font-bold shadow-md transition-all hover:scale-105">
        Get Started for Free
      </Button>
      <Button
        variant="outline"
        className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-600 text-lg px-8 py-6 font-bold transition-all hover:scale-105"
      >
        For Parents
      </Button>
    </motion.div>
  </div>
</section>

      {/* Chatbot Button */}
      <ChatbotButton />
    </>
  )
}

