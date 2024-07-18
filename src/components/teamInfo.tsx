import axios from "axios";
import React from "react";

type teamDetails = {
  team: string;
  members: any[];
  registered: boolean;
  abstract: {
    projectTitle: string;
    theme: string;
    description: string;
  };
};

interface TeamProps {
  teamInfo: teamDetails;
}

export default function TeamInfo(props: TeamProps) {
  const handleShortlist = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to shortlist this team?"
    );

    if (confirmed) {
      try {
        const response = await axios.post("/api/shortlistTeams", {
          team: props.teamInfo,
        });
        console.log(response.data.message);
      } catch (error) {
        console.error("Failed to shortlist team:", error);
        console.log("Failed to shortlist team");
      }
    }
  };

  return (
    <div className="flex md:grid md:grid-cols-4 ">
      <div className="col-span-3 p-4 md:p-8">
        <div className="w-full bg-slate-400 p-2 md:p-4 rounded">
          <div className=" flex justify-between text-2xl font-bold text-slate-900 pb-4">
            <div>
              Team :{" "}
              <span className="text-blue-950">{props.teamInfo.team}</span>
            </div>
            <div className="text-lg">
              <button
                onClick={handleShortlist}
                className="border-2 px-4 rounded border-slate-900 duration-300 hover:bg-slate-900 hover:text-slate-400"
              >
                {" "}
                Shortlist
              </button>
            </div>
          </div>

          <div className="text-base font-bold flex justify-between w-full text-slate-900">
            <div>
              Project Title :{" "}
              <span
                className={
                  props.teamInfo.abstract.projectTitle !== ""
                    ? "text-slate-900"
                    : "text-red-500"
                }
              >
                {props.teamInfo.abstract.projectTitle !== ""
                  ? props.teamInfo.abstract.projectTitle
                  : "Not Submitted"}
              </span>
            </div>
          </div>
          <div className="text-base font-bold pb-8 text-slate-900">
            Theme :{" "}
            <span
              className={
                props.teamInfo.abstract.theme !== ""
                  ? "text-slate-900"
                  : "text-red-500"
              }
            >
              {props.teamInfo.abstract.theme !== ""
                ? props.teamInfo.abstract.theme
                : "Not Submitted"}
            </span>
          </div>
          <div className="text-base font-bold pb-8 text-slate-900">
            Description :{" "}
            <span
              className={
                props.teamInfo.abstract.description !== ""
                  ? "text-slate-900 font-light"
                  : "text-red-500 font-bold"
              }
            >
              {props.teamInfo.abstract.description !== ""
                ? props.teamInfo.abstract.description
                : "Not Submitted"}
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-1 p-4 md:p-8 bg-slate-400 rounded-lg">
        <div className="flex flex-col">
          <div className="text-xl pb-4 font-bold">Team Members</div>
          {props.teamInfo.members.map((member, index) => (
            <div key={index} className="mb-4">
              <div className="text-base font-bold text-slate-900">
                {index == 0 ? "Team Leader" : "Member " + index} : {member.name}
              </div>
              <div className="text-base text-slate-700">
                <strong>Email</strong> : {member.email}
              </div>
              <div className="text-base text-slate-700">
                <strong>College</strong> : {member.college}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
