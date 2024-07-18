import { useState, useEffect } from "react";
import axios from "axios";
import TeamInfo from "./teamInfo";

export default function Teams() {
  const [teamsData, setTeamsData] = useState([]);
  const [shteamsData, setShTeamsData] = useState([]);

  const [registered, setRegistered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [teamSelected, setTeamSelected] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [load, setLoad] = useState(false);
  const [shortlist, setShortlist] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/fetchTeams");
        setTeamsData(response.data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    const fetchShTeams = async () => {
      try {
        const response = await axios.get("/api/fetchShortlistTeams");
        setShTeamsData(response.data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    fetchShTeams();
    fetchTeams();
  }, []);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, [shortlist]);

  const filteredTeams = shortlist
    ? teamsData.filter(
        (team) =>
          //@ts-ignore
          team.registered === registered
      )
    : shteamsData;

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTeams = filteredTeams.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const teams = (
    <div className="flex flex-col w-dvw p-4">
      <div className="relative p-4 w-full md:p-8 border-b-2 border-slate-500">
        <div className="text-2xl font-bold text-white pb-8 flex  justify-between w-full">
          Teams
          <button
            onClick={() => setShortlist(!shortlist)}
            className="text-lg font-normal border-2 border-slate-100 px-4 hover:bg-slate-100 hover:text-slate-900 duration-300"
          >
            Shortlisted Teams {">"}
          </button>
        </div>

        {!teamSelected && (
          <div className="absolute flex gap-x-1 bottom-1 right-0">
            <button
              onClick={() => setRegistered(false)}
              className={
                "px-4 duration-300 w-[150px] border-2 border-slate-500 " +
                (!registered ? "bg-slate-500 text-black" : "text-slate-500")
              }
            >
              Not Registered
            </button>
            <button
              onClick={() => {
                setRegistered(true);
                setCurrentPage(1);
              }}
              className={
                "px-4 duration-300 w-[150px] border-2 border-slate-500 " +
                (registered ? "bg-slate-500 text-black" : "text-slate-500")
              }
            >
              Registered
            </button>
          </div>
        )}

        {teamSelected && (
          <div className="absolute bottom-1 right-0">
            <button
              onClick={() => {
                setTeamSelected(false);
                setTeamData(null);
              }}
              className="w-[120px] px-4 border-2 border-slate-200 text-slate-300 hover:bg-slate-300 hover:text-slate-900 font-bold duration-300"
            >
              Back
            </button>
          </div>
        )}
      </div>
      <div className="tb p-4 w-full">
        {!teamSelected && (
          <div>
            <table className="min-w-full text-white">
              <thead>
                <tr>
                  <th className="border-b border-slate-600 py-2">Team Name</th>
                  <th className="border-b border-slate-600 py-2">
                    Team Leader Email
                  </th>
                  <th className="border-b border-slate-600 py-2">
                    Number of Members
                  </th>
                  <th className="border-b border-slate-600 py-2">Registered</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentTeams.map((team, index) => (
                  <tr key={index}>
                    <td
                      onClick={() => {
                        setTeamSelected(true);
                        setTeamData(team);
                      }}
                      className="border-b border-slate-600 py-2 hover:text-orange-500 cursor-pointer duration-200"
                    >
                      {
                        //@ts-ignore
                        team.team
                      }
                    </td>
                    <td className="border-b border-slate-600 py-2">
                      {
                        //@ts-ignore
                        team.members[0].email
                      }
                    </td>
                    <td className="border-b border-slate-600 py-2">
                      {
                        //@ts-ignore
                        team.members.length
                      }
                    </td>
                    <td className="border-b border-slate-600 py-2">
                      {
                        //@ts-ignore
                        team.registered.toString()
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-900 text-slate-100 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-900 text-slate-100 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        )}
        {
          //@ts-ignore
          teamSelected && <TeamInfo teamInfo={teamData} />
        }
      </div>
    </div>
  );

  const ShortListTeams = (
    <div className="flex flex-col w-dvw p-4">
      <div className="relative p-4 w-full md:p-8 border-b-2 border-slate-500">
        <div className="text-2xl font-bold text-white pb-8 flex  justify-between w-full">
          Teams
          <button
            onClick={() => setShortlist(!shortlist)}
            className="text-lg font-normal border-2 border-slate-100 px-4 hover:bg-slate-100 hover:text-slate-900 duration-300"
          >
            Teams {">"}
          </button>
        </div>

        {teamSelected && (
          <div className="absolute bottom-1 right-0">
            <button
              onClick={() => {
                setTeamSelected(false);
                setTeamData(null);
              }}
              className="w-[120px] px-4 border-2 border-slate-200 text-slate-300 hover:bg-slate-300 hover:text-slate-900 font-bold duration-300"
            >
              Back
            </button>
          </div>
        )}
      </div>
      <div className="tb p-4 w-full">
        {!teamSelected && (
          <div>
            <table className="min-w-full text-white">
              <thead>
                <tr>
                  <th className="border-b border-slate-600 py-2">Team Name</th>
                  <th className="border-b border-slate-600 py-2">
                    Team Leader Email
                  </th>
                  <th className="border-b border-slate-600 py-2">
                    Number of Members
                  </th>
                  <th className="border-b border-slate-600 py-2">Registered</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentTeams.map((team, index) => (
                  <tr key={index}>
                    <td
                      onClick={() => {
                        setTeamSelected(true);
                        setTeamData(team);
                      }}
                      className="border-b border-slate-600 py-2 hover:text-orange-500 cursor-pointer duration-200"
                    >
                      {
                        //@ts-ignore
                        team.team
                      }
                    </td>
                    <td className="border-b border-slate-600 py-2">
                      {
                        //@ts-ignore
                        team.members[0].email
                      }
                    </td>
                    <td className="border-b border-slate-600 py-2">
                      {
                        //@ts-ignore
                        team.members.length
                      }
                    </td>
                    <td className="border-b border-slate-600 py-2">
                      {
                        //@ts-ignore
                        team.registered.toString()
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-900 text-slate-100 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-900 text-slate-100 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        )}
        {
          //@ts-ignore
          teamSelected && <TeamInfo teamInfo={teamData} />
        }
      </div>
    </div>
  );
  if (load) {
    return <div>Loading...</div>;
  }
  return shortlist ? teams : ShortListTeams;
}
