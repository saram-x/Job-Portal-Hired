import { Button } from "@/components/ui/button";

// Configuration generator for admin table sections
export const createTableConfig = (
  activeTab,
  searchValues,
  setSearchValues,
  filteredData,
  loading,
  handleFunctions,
  handleAutoDetect
) => {
  const configs = {
    users: {
      title: "All Users",
      searchPlaceholder: "Search by email or name...",
      searchValue: searchValues.searchEmail,
      onSearchChange: setSearchValues.setSearchEmail,
      data: filteredData.filteredUsers,
      totalCount: filteredData.filteredUsers.length,
      loading: loading.loading,
      loadingMessage: "Loading users...",
      emptyMessage: searchValues.searchEmail ? "No users found matching your search." : "No users found.",
      headers: ["Name", "Email", "Username", "Role", "Status", "Last Signed In", "Created", "Actions"],
      renderRow: (user) => (
        <UserRow 
          key={user.id} 
          user={user} 
          onBanUser={handleFunctions.handleBanUser} 
          onDeleteUser={handleFunctions.handleDeleteUser} 
        />
      )
    },
    jobs: {
      title: "All Jobs",
      searchPlaceholder: "Search by title or recruiter email...",
      searchValue: searchValues.searchJobs,
      onSearchChange: setSearchValues.setSearchJobs,
      data: filteredData.filteredJobs,
      totalCount: filteredData.filteredJobs.length,
      loading: loading.jobsLoading,
   
