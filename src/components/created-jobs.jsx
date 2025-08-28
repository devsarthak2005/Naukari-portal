import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect, useState, useMemo } from "react";
import Pagination from "./ui/pagination";

const CreatedJobs = () => {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate paginated jobs
  const paginatedJobs = useMemo(() => {
    if (!createdJobs) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return createdJobs.slice(startIndex, endIndex);
  }, [createdJobs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((createdJobs?.length || 0) / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {loadingCreatedJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : (
        <>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedJobs?.length ? (
              paginatedJobs.map((job) => {
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    onJobAction={fnCreatedJobs}
                    isMyJob
                  />
                );
              })
            ) : (
              <div className="text-center text-gray-400 col-span-full">
                No Jobs Found 😢
              </div>
            )}
          </div>
          
          {/* Pagination Component */}
          {createdJobs?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={createdJobs?.length || 0}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CreatedJobs;