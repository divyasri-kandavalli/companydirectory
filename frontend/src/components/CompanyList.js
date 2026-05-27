import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch companies with Axios
  const fetchCompanies = async () => {
    try {
      const response = await axios.get("https://companies-directory-iy9m.onrender.com/api/companies");
      setCompanies(response.data);
    } catch (err) {
      setError("Failed to fetch companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Unique filter options
  const uniqueLocations = [...new Set(companies.map((c) => c.location))];
  const uniqueIndustries = [...new Set(companies.map((c) => c.industry))];

  // Filter logic
  const filteredCompanies = companies.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter ? c.location === locationFilter : true;
    const matchesIndustry = industryFilter ? c.industry === industryFilter : true;
    return matchesSearch && matchesLocation && matchesIndustry;
  });

  // Sort logic
  const sortedCompanies = filteredCompanies.sort((a, b) => {
    if (a[sortField].toLowerCase() < b[sortField].toLowerCase())
      return sortOrder === "asc" ? -1 : 1;
    if (a[sortField].toLowerCase() > b[sortField].toLowerCase())
      return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);
  const displayedCompanies = sortedCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Loading state
  if (loading)
    return (
      <div className="min-h-screen flex flex-col">
        <h1 className="text-3xl font-bold text-center my-6">
          Companies Directory
        </h1>
        <div className="flex-1 flex flex-col justify-center items-center">
          <img
            src="https://media.giphy.com/media/3o6ZsYZ3b0d5ajpw7y/giphy.gif"
            alt="Loading"
            className="w-20 h-20"
          />
          <p className="mt-2 text-gray-700">Loading companies...</p>
        </div>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="min-h-screen flex flex-col">
        <h1 className="text-3xl font-bold text-center my-6">
          Companies Directory
        </h1>
        <div className="flex-1 flex flex-col justify-center items-center">
          <img
            src="https://media.giphy.com/media/3o6ZsYZ3b0d5ajpw7y/giphy.gif"
            alt="Error"
            className="w-20 h-20"
          />
          <p className="mt-2 text-red-500">{error}</p>
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setLocationFilter("");
              setIndustryFilter("");
              setCurrentPage(1);
              setError(null);
              setLoading(true);
              fetchCompanies();
            }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center my-6">
        Companies Directory
      </h1>

      {/* Main content centered */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-4">
        {/* Filter Controls */}
        <div className="w-full max-w-6xl bg-white shadow-md p-4 rounded mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <input
            type="text"
            placeholder="Search by name"
            className="border rounded px-3 py-2 flex-1"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="border rounded px-3 py-2"
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={industryFilter}
            onChange={(e) => {
              setIndustryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Industries</option>
            {uniqueIndustries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="industry">Industry</option>
          </select>
          <select
            className="border rounded px-3 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <Button
            variant="contained"
            color="secondary"
            className="mt-2 sm:mt-0"
            onClick={() => {
              setSearch("");
              setLocationFilter("");
              setIndustryFilter("");
              setSortField("name");
              setSortOrder("asc");
              setCurrentPage(1);
            }}
          >
            Reset All Filters
          </Button>
        </div>

        {/* Companies Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center min-h-[200px]">
          {displayedCompanies.length > 0 ? (
            displayedCompanies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center p-10 bg-gray-50 rounded">
              <img
                src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
                alt="No results"
                className="w-24 h-24 mb-4"
              />
              <p className="text-gray-500 text-lg">No results found</p>
              <Button
                variant="contained"
                color="primary"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setLocationFilter("");
                  setIndustryFilter("");
                  setCurrentPage(1);
                }}
              >
                Back to Home
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <IconButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <span className="px-2">{`${currentPage} / ${totalPages}`}</span>
            <IconButton
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
