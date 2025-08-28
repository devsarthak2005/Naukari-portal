import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useEffect,useState, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card";
import { getCompanies } from "@/api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue,SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { City, State } from "country-state-city";
import Pagination from "@/components/ui/pagination";
import { Search } from "lucide-react";


const JobListing = () => 
{

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of jobs per page


 const { isLoaded } = useUser();

   const {
    fn: fnCompanies,
    data: companies
  } = useFetch(getCompanies);
 
  const {
    fn: fnJobs,
    data: jobs,
    loading:loadingJobs,
  } = useFetch(getJobs,
    {
      location,
      company_id,
      searchQuery
    }
  );

   useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded,location, company_id, searchQuery]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [location, company_id, searchQuery]);

  // Calculate paginated jobs
  const paginatedJobs = useMemo(() => {
    if (!jobs) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return jobs.slice(startIndex, endIndex);
  }, [jobs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((jobs?.length || 0) / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

   const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };


  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form onSubmit={handleSearch}
       className="h-14 flex flex-row w-full gap-2 items-center mb-3">

        <Input type="text" 
        placeholder="Search jobs..."
        name="search-query"
        className="h-full flex-1  px-4 text-md"
        />
         <Button 
          type="submit" 
          className="h-14 w-14 p-0 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
          variant="default"
        >
          <Search className="h-5 w-5 text-white" />
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
             <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
             {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

         <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
         <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>





       {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

       {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedJobs?.length ? (
            paginatedJobs.map((job) => {
              return <JobCard key={job.id} job={job} 
              savedInit = {job.saved?.length > 0}
              />;
          })
          ) : (
            <div className="text-center text-gray-400 col-span-full">
              No jobs found.
            </div>
          )}
        </div>
      )}

      {/* Pagination Component */}
      {loadingJobs === false && jobs?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={jobs?.length || 0}
        />
      )}
    </div>
  )
}

export default JobListing