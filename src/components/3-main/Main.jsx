import React, { useState, useEffect } from "react";
import "./main.css";

// Define the available technologies
const TECHNOLOGIES = ["HTML/CSS", "JavaScript/React", "PHP"];

// // Helper function to fetch languages for a given repository
const fetchLanguages = async (repoUrl) => {
  try {
    const response = await fetch(`${repoUrl}/languages`);
    const data = await response.json();
    return Object.keys(data);
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
};

function Main() {
  // ... Your existing useState and useEffect code
  const [projects, setProjects] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/omar-sala/repos",
          {
            headers: {
              Authorization: `api`,
            },
          }
        );
        const data = await response.json();

        // Fetch languages for each project
        const formattedProjects = await Promise.all(
          data.map(async (repo) => {
            const languages = await fetchLanguages(repo.url);
            return {
              title: repo.name,
              description: repo.description || "No description available",
              technologies: languages.length ? languages : ["Unknown"],
              link: repo.html_url,
            };
          })
        );

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on selected technology
  const filteredProjects =
    selectedTechnology === "All"
      ? projects
      : projects.filter((project) => {
          const techs = project.technologies;
          if (selectedTechnology === "HTML/CSS") {
            return techs.includes("HTML") || techs.includes("CSS");
          } else if (selectedTechnology === "JavaScript/React") {
            return techs.includes("JavaScript") || techs.includes("React");
          }
          return techs.includes(selectedTechnology);
        });

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <main className="flex">
      <section className="left-section flex">
        {/* Filter Buttons */}
        <button
          onClick={() => setSelectedTechnology("All")}
          className={selectedTechnology === "All" ? "active" : ""}
        >
          All Projects
        </button>
        {TECHNOLOGIES.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTechnology(tech)}
            className={selectedTechnology === tech ? "active" : ""}
          >
            {tech}
          </button>
        ))}
      </section>

      <section className="right-section flex">
        {paginatedProjects.map((project, index) => (
          <div className="card" key={index}>
            <div className="box">
              <h3 className="title">{project.title}</h3>
              <p className="sub-title">{project.description}</p>
              <p className="techn">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>
              <a href={project.link} target="_blank">
                View Project
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Move the pagination outside of the sections */}
      <div className="pagination">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default Main;
