import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { CalendarDays, GraduationCap, Heart, Users, Sprout, Award } from 'lucide-react';

interface TimelineItem {
  date: string;
  icon: JSX.Element;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    date: "2015",
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Foundation Established",
    description: "Basava Yuva Brigade was founded with a vision to transform rural education."
  },
  {
    date: "2017",
    icon: <Heart className="w-6 h-6" />,
    title: "Healthcare Initiative",
    description: "Launched mobile healthcare clinics serving remote villages across Karnataka."
  },
  {
    date: "2019",
    icon: <Sprout className="w-6 h-6" />,
    title: "Sustainable Farming",
    description: "Initiated organic farming programs, empowering local farmers."
  },
  {
    date: "2021",
    icon: <Users className="w-6 h-6" />,
    title: "Community Growth",
    description: "Expanded to 50+ villages, impacting over 10,000 lives directly."
  },
  {
    date: "2023",
    icon: <Award className="w-6 h-6" />,
    title: "State Recognition",
    description: "Received Karnataka State Award for Excellence in Rural Development."
  },
  {
    date: "2025",
    icon: <CalendarDays className="w-6 h-6" />,
    title: "Digital Revolution",
    description: "Launched digital literacy centers in 100 villages across Karnataka."
  }
];

interface TimelineItemProps {
  item: TimelineItem;
  index: number;
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} w-full mb-8`}
    >
      <div className={`absolute left-1/2 -translate-x-1/2 w-px h-full bg-primary/20 ${index === timelineData.length - 1 ? 'h-1/2' : ''}`} />
      <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
          {item.icon}
        </div>
      </div>
      
      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}>
        <div className={`p-6 bg-card rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
          <span className="inline-block px-3 py-1 mb-2 text-sm font-semibold text-primary bg-primary/10 rounded-full">
            {item.date}
          </span>
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineSection = () => {
  return (
    <section id="timeline" className="content-section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A decade of dedication to rural development and community empowerment.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
