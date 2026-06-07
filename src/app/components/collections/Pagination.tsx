import { ChevronLeft, ChevronRight } from "lucide-react";



type Props = {

page: string;

total: number;

handlePageChange: (page: number) => void;

};



function Pagination({

handlePageChange,

page,

total,

}: Props) {

const currentPage = Number(page);



/* =========================

PAGINATION

========================= */



const LIMIT = 12;



const totalPages = Math.ceil(total / LIMIT);



const hasPrev = currentPage > 1;

const hasNext = currentPage < totalPages;



return (

<nav className="mt-20 flex items-center justify-center gap-6">



{/* PREV */}

<button

disabled={!hasPrev}

onClick={() =>

handlePageChange(currentPage - 1)

}

className="flex h-12 items-center gap-2 rounded-full bg-surface-container px-5 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"

>

<ChevronLeft size={18} />



<span className="text-sm font-medium">

Previous

</span>

</button>



{/* PAGE INFO */}

<div className="text-sm font-medium">

Page {currentPage} of {totalPages}

</div>



{/* NEXT */}

<button

disabled={!hasNext}

onClick={() =>

handlePageChange(currentPage + 1)

}

className="flex h-12 items-center gap-2 rounded-full bg-surface-container px-5 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"

>

<span className="text-sm font-medium">

Next

</span>



<ChevronRight size={18} />

</button>

</nav>

);

}



export default Pagination; 

