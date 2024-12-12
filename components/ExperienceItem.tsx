import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string[]
  darkMode: boolean
}

export function ExperienceItem({ title, company, period, description, darkMode }: ExperienceItemProps) {
  return (
    <Card className={`overflow-hidden ${darkMode ? 'bg-[#002538] border-[#F2EDE4]' : 'bg-[#F2EDE4] border-[#002538]'} border-opacity-20 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg`}>
      <CardHeader className={`${darkMode ? 'bg-gradient-to-br from-[#002538] to-[#003a5a]' : 'bg-gradient-to-br from-[#F2EDE4] to-[#e0d8c8]'}`}>
        <div className="flex items-center justify-between">
          <CardTitle className={`text-xl font-bold ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}>{title}</CardTitle>
          <Briefcase className={`w-6 h-6 ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`} />
        </div>
        <CardDescription className={`text-lg ${darkMode ? 'text-[#F2EDE4]/90' : 'text-[#002538]/90'}`}>
          {company}
        </CardDescription>
        <CardDescription className={`text-sm ${darkMode ? 'text-[#F2EDE4]/70' : 'text-[#002538]/70'}`}>
          {period}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ul className={`list-disc pl-5 space-y-2 ${darkMode ? 'text-[#F2EDE4]/80' : 'text-[#002538]/80'}`}>
          {description.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

