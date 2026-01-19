"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Image from "next/image";

export function DemoSection() {
  return (
    <section className="relative w-full py-16 md:py-24 flex items-center justify-center">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <a
            href="https://youtu.be/txmtrfhLERg"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block w-full max-w-4xl"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border-subtle shadow-lg">
              <Image
                src="/Gemini_Generated_Image_sswmursswmursswm.png"
                alt="Apriori Demo Video"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber/90 backdrop-blur-sm flex items-center justify-center shadow-amber-glow group-hover:bg-amber transition-colors">
                    <PlayCircle 
                      className="w-10 h-10 md:w-12 md:h-12 text-deep ml-1" 
                      fill="currentColor"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
