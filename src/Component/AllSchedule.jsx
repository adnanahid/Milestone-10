// import React, { useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import { MdDelete } from "react-icons/md";

// const AllSchedule = () => {
//   const allInfos = useLoaderData();
//   const [patients, setPatients] = useState(allInfos);
//   console.log(patients);

//   const handleDelete = (_id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`http://localhost:3333/patientsAppointmentFormDelete/${_id}`, {
//           method: "DELETE",
//         })
//           .then((res) => res.json())
//           .then((result) => {
//             console.log(result);
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your file has been deleted.",
//               icon: "success",
//             });
//             const remainingPatients = patients.filter(
//               (patient) => patient._id !== _id
//             );
//             setPatients(remainingPatients);
//           });
//       }
//     });
//   };
//   return (
//     <div className="max-w-screen-xl mx-auto">
//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th className="text-center"></th>
//               <th className="text-center">Name</th>
//               <th className="text-center">Reason</th>
//               <th className="text-center">Date</th>
//               <th className="text-center">Delete Appointment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {patients.length === 0 ? (
//               <p>No Data Found</p>
//             ) : (
//               patients.map((singleInfo, index) => (
//                 <tr key={index} className="bg-base-200">
//                   <th className="text-center">{index + 1}</th>
//                   <td className="text-center">{singleInfo.patientName}</td>
//                   <td className="text-center">{singleInfo.reason}</td>
//                   <td className="text-center">{singleInfo.date}</td>
//                   <td className="text-center">
//                     <button onClick={() => handleDelete(singleInfo._id)}>
//                       <MdDelete className="mx-auto" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllSchedule;
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import Swal from "sweetalert2";

const AllSchedule = () => {
  const allInfos = useLoaderData();
  const [patients, setPatients] = useState(allInfos);
  const [loading, setLoading] = useState(false);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        fetch(`http://localhost:3333/patientsAppointmentFormDelete/${_id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete the appointment.");
            }
            return res.json();
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your appointment has been deleted.",
              icon: "success",
            });
            const remainingPatients = patients.filter(
              (patient) => patient._id !== _id
            );
            setPatients(remainingPatients);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message || "Failed to delete the appointment.",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        All Scheduled Appointments
      </h1>
      <div className="overflow-x-auto">
        {patients.length === 0 ? (
          <p className="text-center text-gray-600 py-4">
            No appointments found.
          </p>
        ) : (
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th className="text-center">Serial</th>
                <th className="text-center">Name</th>
                <th className="text-center">Reason</th>
                <th className="text-center">Date</th>
                <th className="text-center">Delete</th>
                <th className="text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((singleInfo, index) => (
                <tr key={singleInfo._id} className="bg-base-200">
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{singleInfo.patientName}</td>
                  <td className="text-center">{singleInfo.reason}</td>
                  <td className="text-center">{singleInfo.date}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(singleInfo._id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete appointment for ${singleInfo.patientName}`}
                      disabled={loading}
                    >
                      <MdDelete className="mx-auto text-xl" />
                    </button>
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/updateForm/${singleInfo._id}`}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete appointment for ${singleInfo.patientName}`}
                      disabled={loading}
                    >
                      <RxUpdate className="mx-auto text-xl" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {loading && (
        <div className="text-center text-blue-500 mt-4">
          Processing your request...
        </div>
      )}
    </div>
  );
};

export default AllSchedule;
