import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Modal from '../ui/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvailableProjects = () => {

    const navigate = useNavigate();

    const data = [
        {
            stdAbsId: 1,
            title: "Title 1",
            abstract: "Abstract 1",
            domain: "Domain 1",
            keywords: "Keywords 1",
        },
        {
            stdAbsId: 2,
            title: "Title 2",
            abstract: "Abstract 2",
            domain: "Domain 2",
            keywords: "Keywords 2",
        },
        {
            stdAbsId: 3,
            title: "Title 3",
            abstract: "Abstract 3",
            domain: "Domain 3",
            keywords: "Keywords 3",
        },
        {
            stdAbsId: 4,
            title: "Title 4",
            abstract: "Abstract 4",
            domain: "Domain 4",
            keywords: "Keywords 4",
        },
        {
            stdAbsId: 5,
            title: "Title 5",
            abstract: "Abstract 5",
            domain: "Domain 5",
            keywords: "Keywords 5",
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  
  const names = data.map((item) => item.title);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNameSelect = (name) => {
    setSelectedName(name);
    console.log("Selected Name:", name); // You can perform other actions here
  };


    return (
        <div className='mt-16'>
            <p className='text-2xl font-bold'>Available Projects</p>
            <div className="w-full bg-gray-200 rounded-md shadow-md mt-6 p-4">
                <Accordion type="single" collapsible className="w-full">
                    {
                        data.map((item, index) => (
                            <AccordionItem key={item.stdAbsId} value={`item-${item.stdAbsId}`}>
                                <AccordionTrigger>{item.title}</AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        {item.abstract}
                                        <p className='font-bold'>{item.domain}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
            <div>
                <button
                onClick={openModal}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none m-2"
                >
                    select a project
                </button>
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none m-2"
                    onClick={() => navigate('/student/availableGroups')}
                >
                    look for a group

                </button>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        names={names}
        onSelect={handleNameSelect}
      />

            </div>
        </div>
    )
}

export default AvailableProjects