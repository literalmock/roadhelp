import React from 'react'
import faqs from "../data/faqs.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Home = () => {
  return (
    <div>
        <main className="flex flex-col gap-10 sm:gap-20 py-30 sm:py-20">
     <section className="text-center bg-[url('/road2.jpg')] bg-cover bg-center bg-no-repeat py-20">
        <h1 className="flex flex-col text-white items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Got Stuck On Road
          <span className="flex items-center gap-2 sm:gap-6">
            Just Get
            <img
              src="/logo.png"
              className="h-14 sm:h-24 lg:h-32"
              alt="Hirrd Logo"
            />
          </span>
        </h1>
          <p className="text-white mt-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto text-center">
          Find quick emergency roadside assistance or locate the nearest mechanic in just a few taps.
        </p>
      </section>




    <Accordion
  type="multiple"
  className="w-full max-w-7xl mx-auto px-4 sm:px-8 rounded-md border border-gray-200 bg-white shadow"
>
  {faqs.map((faq, index) => (
    <AccordionItem
      key={index}
      value={`item-${index + 1}`}
      className="border-b border-gray-200 last:border-b-0"
    >
      <AccordionTrigger className="w-full px-4 py-5 text-left text-gray-800 font-medium hover:bg-gray-50 transition">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="px-4 py-4 text-gray-700 bg-gray-50">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
 
 
      </main>
      </div>
  )
}

export default Home
