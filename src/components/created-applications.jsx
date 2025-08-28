import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./application-card";
import { useEffect, useState, useMemo } from "react";
import { getApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import Pagination from "./ui/pagination";

const CreatedApplications = () => {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Applications per page

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate paginated applications
  const paginatedApplications = useMemo(() => {
    if (!applications) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return applications.slice(startIndex, endIndex);
  }, [applications, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((applications?.length || 0) / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {paginatedApplications?.length ? (
          paginatedApplications.map((application) => {
            return (
              <ApplicationCard
                key={application.id}
                application={application}
                isCandidate={true}
              />
            );
          })
        ) : (
          <div className="text-center text-gray-400">
            No applications found 😢
          </div>
        )}
      </div>
      
      {/* Pagination Component */}
      {applications?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={applications?.length || 0}
        />
      )}
    </>
  );
};

export default CreatedApplications;