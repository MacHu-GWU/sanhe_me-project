import { motion } from "framer-motion";
import Image from "next/image";
import { CDN_ASSETS, METADATA } from "@/lib/constants";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-4xl mx-auto md:mt-12 px-4"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200">
        {/* Hero Image Section */}
        <div className="w-full bg-white px-6 pt-6">
          <div className="w-full aspect-[1534/464] relative">
            <Image
              src={CDN_ASSETS.HERO_IMAGE_LOW_MARGIN}
              alt="Sanhe Hu Profile Banner"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 pb-10 flex flex-col gap-6 leading-relaxed">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              你好！我是 {METADATA.AI_ASSISTANT_NAME} 👋
            </h2>
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
              我可以回答关于 Sanhe 的背景、工作经验、技术栈、项目作品等任何问题。
              让我帮助你更好地了解他！
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
