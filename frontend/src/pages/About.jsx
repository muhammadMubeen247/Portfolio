import { useEffect, useState } from "react";
import { Search, Star, Lock } from "lucide-react";
import ProjectCarousel from "../components/ProjectCarousel.jsx";

function searchSections(sections, query) {
  const q = query.trim().toLowerCase();
  if (!q || !sections) return [];

  const results = [];
  sections.forEach((section) => {
    if (section.type === "projects") {
      (section.items || []).forEach((project) => {
        const nameMatch = project.name?.toLowerCase().includes(q);
        const descMatch = project.description?.toLowerCase().includes(q);
        if (nameMatch || descMatch) {
          results.push({
            id: project.id || project.name,
            label: project.name || "Untitled project",
          });
        }
      });
      return;
    }

    const titleMatch = section.title?.toLowerCase().includes(q);
    const contentMatch =
      section.type === "text" && section.content?.toLowerCase().includes(q);
    const itemsMatch =
      section.type === "list" &&
      (section.items || []).some((item) => item.toLowerCase().includes(q));
    const contactMatch =
      section.type === "contact" &&
      (section.items || []).some(
        (item) =>
          item.label?.toLowerCase().includes(q) ||
          item.value?.toLowerCase().includes(q)
      );

    if (titleMatch || contentMatch || itemsMatch || contactMatch) {
      results.push({ id: section.id, label: section.title || "Untitled section" });
    }
  });

  return results;
}

function About() {
  const [profile, setProfile] = useState(null);
  const [sections, setSections] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/about/profile").then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      }),
      fetch("/about/sections").then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      }),
    ])
      .then(([profileData, sectionsData]) => {
        setProfile(profileData);
        setSections(sectionsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="wiki-status">Loading...</div>;
  if (error) return <div className="wiki-status">Failed to load: {error}</div>;

  const searchResults = searchSections(sections, query);

  const goToResult = (id) => {
    setQuery("");
    window.location.hash = id;
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      e.preventDefault();
      goToResult(searchResults[0].id);
    } else if (e.key === "Escape") {
      setQuery("");
    }
  };

  return (
    <div id="wiki">
      <header className="wiki-header">
        <div className="wiki-logo">
          <span className="wiki-logo-title">Mubeen's Portfolio</span>
          {/* <span className="wiki-logo-sub">the free CV</span> */}
        </div>
        <div className="wiki-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          {query.trim() && (
            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <a
                    key={result.id}
                    href={`#${result.id}`}
                    className="search-result"
                    onClick={() => setQuery("")}
                  >
                    {result.label}
                  </a>
                ))
              ) : (
                <div className="search-no-results">No results found</div>
              )}
            </div>
          )}
        </div>
        <nav className="wiki-nav">
          <a href="#">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="wiki-body">
        <aside className="wiki-toc">
          {/* <div className="wiki-toc-title">
            Contents <span className="hide-btn">hide</span>
          </div> */}
          <div className="wiki-toc-top">(Top)</div>
          <ol>
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span className="toc-number">{index + 1}</span>{" "}
                  {section.title || "Untitled section"}
                </a>
                {section.type === "projects" &&
                  section.items &&
                  section.items.length > 0 && (
                    <ol className="toc-sub">
                      {section.items.map((project, subIndex) => (
                        <li key={project.id || project.name}>
                          <a href={`#${project.id || project.name}`}>
                            <span className="toc-number">
                              {index + 1}.{subIndex + 1}
                            </span>{" "}
                            {project.name || "Untitled project"}
                          </a>
                        </li>
                      ))}
                    </ol>
                  )}
              </li>
            ))}
          </ol>
        </aside>

        <main className="wiki-article">
          <h1>{profile.name || "Your Name"}</h1>

          {/* <div className="wiki-tabs">
            <span className="tab active">Article</span>
            <span className="tab">Talk</span>
            <span className="wiki-tabs-right">
              <span className="tab active">Read</span>
              <span className="tab">Edit</span>
              <Star size={16} />
              <Lock size={16} />
            </span>
          </div>

          <p className="wiki-from">
            From your Portfolio, the personal encyclopedia
          </p> */}

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="wiki-section">
              <h2>{section.title || "Untitled section"}</h2>
              {section.type === "list" ? (
                section.items && section.items.length > 0 ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="placeholder">
                    Add your {section.title?.toLowerCase() || "items"} here.
                  </p>
                )
              ) : section.type === "projects" ? (
                section.items && section.items.length > 0 ? (
                  <div className="project-list">
                    {section.items.map((project) => (
                      <figure
                        className="project"
                        id={project.id || project.name}
                        key={project.id || project.name}
                      >
                        <ProjectCarousel
                          images={project.images}
                          name={project.name}
                        />
                        <figcaption>
                          <h3>{project.name || "Untitled project"}</h3>
                          {project.description ? (
                            <p>{project.description}</p>
                          ) : (
                            <p className="placeholder">
                              Write a description here.
                            </p>
                          )}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ) : (
                  <p className="placeholder">Add your projects here.</p>
                )
              ) : section.type === "contact" ? (
                section.items && section.items.some((item) => item.value) ? (
                  <ul className="contact-list">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <strong>{item.label}:</strong>{" "}
                        {item.value ? (
                          <a
                            href={item.href || item.value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="placeholder">
                            Add your {item.label.toLowerCase()} here.
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="placeholder">Add your contact details here.</p>
                )
              ) : section.content ? (
                <p>{section.content}</p>
              ) : (
                <p className="placeholder">
                  Write your {section.title?.toLowerCase() || "content"} here.
                </p>
              )}
            </section>
          ))}
        </main>

        <aside className="wiki-infobox">
          <div className="infobox">
            {profile.titles && profile.titles.length > 0 && (
              <div className="infobox-titles">
                {profile.titles.map((title) => (
                  <div key={title}>{title}</div>
                ))}
              </div>
            )}

            <div className="infobox-name">{profile.name || "Your Name"}</div>

            <div className="infobox-image">
              {profile.image ? (
                <img src={profile.image} alt={profile.name || "Profile"} />
              ) : (
                <div className="infobox-image-placeholder">Add a photo</div>
              )}
            </div>
            <div className="infobox-caption">
              {profile.imageCaption || "Photo caption"}
            </div>

            {profile.banner && (
              <div className="infobox-banner">{profile.banner}</div>
            )}

            <table className="infobox-facts">
              <tbody>
                {(profile.facts || []).map((fact) => (
                  <tr key={fact.label}>
                    <th>{fact.label}</th>
                    <td>{fact.value || "\u2014"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default About;
