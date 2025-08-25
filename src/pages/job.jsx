import { useUser} from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { getSingleJob } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { MapPinIcon ,DoorClosed, DoorOpen, Briefcase} from "lucide-react";
import { updateHiringStatus } from "@/api/apiJobs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJobDrawer from "@/components/apply-job";

// We'll render requirements with a small safe renderer instead of the markdown component

const JobPage = () => {

   const { isLoaded, user } = useUser();
   const { id } = useParams();

   const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

   const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

    const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

   useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

    if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }


  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>

      <div className="flex justify-between ">
        <div className="flex gap-2">
          <MapPinIcon/>{job?.location}
        </div>
    
         <div className="flex gap-2">
          <Briefcase /> {job?.applications?.length} Applicants
        </div>

        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

        {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}


        <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
        <p className="sm:text-lg">{job?.description}</p>
        
         <h2 className="text-2xl sm:text-3xl font-bold">What we are looking for</h2>

         <RequirementsRenderer source={job?.requirements} />

          {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />

      )}

    </div>
  )
}

export default JobPage

function RequirementsRenderer({ source }) {
  if (!source) return null;

  // Split into non-empty lines
  const lines = source.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  // Detect simple list lines that start with '-', '*', or '•'
  const listLines = lines.filter((l) => /^([-*•])\s+/.test(l));

  if (listLines.length === lines.length && listLines.length > 0) {
    // Render as a list with custom designed bullets
    return (
      <ul className="wmde-markdown bg-transparent sm:text-lg">
        {lines.map((l, idx) => {
          const text = l.replace(/^([-*•])\s+/, "");
          return (
            <li key={idx} className="mb-3">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 flex-none w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 shadow-md"
                />
                <span className="text-base leading-relaxed text-white">{text}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  // Fallback: render each paragraph/line as its own <p>
  return (
    <div className="wmde-markdown bg-transparent sm:text-lg">
      {lines.map((p, i) => (
        <p key={i} className="mb-2">
          {p}
        </p>
      ))}
    </div>
  );
}