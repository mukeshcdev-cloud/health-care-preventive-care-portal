/*
Healthcare Profile Manager - Single-file React component
- Default export: HealthcareProfileManager
- Uses Tailwind CSS classes for styling (no Tailwind import here; include Tailwind in your app)
- Persists data in localStorage under key 'hcp_profiles'
- Features: list, search, create, edit, delete, view, quick medical summary, avatar upload (client-side preview), basic validation, pagination

How to use:
1. Create a React app (Vite / Create React App) and add Tailwind CSS.
2. Drop this file into your project (e.g., src/HealthcareProfileManager.jsx).
3. Import and render <HealthcareProfileManager /> in your app.

Notes:
- This is a client-side mock. Replace localStorage with real API calls for production.
- You can customize fields (insurance, allergies, conditions) as needed.
*/

import React, { useEffect, useState, useMemo } from "react";

const STORAGE_KEY = "hcp_profiles_v1";

// Utility: generate ID
const uid = () => Math.random().toString(36).slice(2, 9);

// Sample seed data
const seedProfiles = [
  {
    id: "p1",
    firstName: "Asha",
    lastName: "Reddy",
    dob: "1989-04-12",
    gender: "Female",
    phone: "+91-9876543210",
    email: "asha.reddy@example.com",
    address: "Chennai, India",
    emergencyContact: {
      name: "Suresh Reddy",
      relation: "Spouse",
      phone: "+91-9123456780",
    },
    insurance: { provider: "Apollo", policyNo: "AP-123456" },
    allergies: "Penicillin",
    conditions: "Hypertension",
    notes: "Requires wheelchair assistance during visits.",
    avatar: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p2",
    firstName: "Vikram",
    lastName: "Sharma",
    dob: "1976-09-03",
    gender: "Male",
    phone: "+91-9444444444",
    email: "vikram.sharma@example.com",
    address: "Bengaluru, India",
    emergencyContact: {
      name: "Priya Sharma",
      relation: "Daughter",
      phone: "+91-9120000000",
    },
    insurance: { provider: "Star Health", policyNo: "SH-987654" },
    allergies: "None",
    conditions: "Diabetes Type II",
    notes: "Follow-up every 3 months.",
    avatar: null,
    createdAt: new Date().toISOString(),
  },
];

function loadProfiles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProfiles));
      return seedProfiles;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load profiles:", e);
    return seedProfiles;
  }
}

function saveProfiles(profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

// Simple validation
function validate(profile) {
  const errors = {};
  if (!profile.firstName || profile.firstName.trim().length < 2)
    errors.firstName = "First name required";
  if (!profile.lastName || profile.lastName.trim().length < 1)
    errors.lastName = "Last name required";
  if (!profile.dob) errors.dob = "Date of birth required";
  if (!profile.phone || !/^\+?[0-9\- ]{7,}$/.test(profile.phone))
    errors.phone = "Valid phone required";
  if (profile.email && !/^\S+@\S+\.\S+$/.test(profile.email))
    errors.email = "Invalid email";
  return errors;
}

// Reusable Input
function Input({ label, id, value, onChange, type = "text", error, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
          error ? "ring-1 ring-red-400" : ""
        }`}
        {...rest}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function TextArea({ label, id, value, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
      />
    </div>
  );
}

function AvatarUploader({ avatar, onChange }) {
  const [preview, setPreview] = useState(avatar);

  useEffect(() => setPreview(avatar), [avatar]);

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(url);
  }

  return (
    <div className="mb-3 flex items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-500">No image</span>
        )}
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleFile} />
        <p className="text-xs text-gray-400">
          Image is stored client-side for demo only.
        </p>
      </div>
    </div>
  );
}

function ProfileForm({ initial = {}, onCancel, onSave }) {
  const [profile, setProfile] = useState({ ...initial });
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
  }

  function updateNested(path, value) {
    setProfile((p) => ({ ...p, [path]: { ...(p[path] || {}), ...value } }));
  }

  function submit(e) {
    e.preventDefault();
    const errs = validate(profile);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSave({ ...profile, updatedAt: new Date().toISOString() });
  }

  return (
    <form onSubmit={submit} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First name"
          id="first"
          value={profile.firstName}
          onChange={(v) => update("firstName", v)}
          error={errors.firstName}
        />
        <Input
          label="Last name"
          id="last"
          value={profile.lastName}
          onChange={(v) => update("lastName", v)}
          error={errors.lastName}
        />
        <Input
          label="Date of birth"
          id="dob"
          type="date"
          value={profile.dob}
          onChange={(v) => update("dob", v)}
          error={errors.dob}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            value={profile.gender || ""}
            onChange={(e) => update("gender", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <Input
          label="Phone"
          id="phone"
          value={profile.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          value={profile.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
        />
      </div>

      <Input
        label="Address"
        id="address"
        value={profile.address}
        onChange={(v) => update("address", v)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Emergency Contact - Name"
          id="ec-name"
          value={
            (profile.emergencyContact && profile.emergencyContact.name) || ""
          }
          onChange={(v) => updateNested("emergencyContact", { name: v })}
        />
        <Input
          label="Emergency Contact - Phone"
          id="ec-phone"
          value={
            (profile.emergencyContact && profile.emergencyContact.phone) || ""
          }
          onChange={(v) => updateNested("emergencyContact", { phone: v })}
        />
        <Input
          label="Insurance Provider"
          id="ins-provider"
          value={(profile.insurance && profile.insurance.provider) || ""}
          onChange={(v) => updateNested("insurance", { provider: v })}
        />
        <Input
          label="Policy Number"
          id="ins-no"
          value={(profile.insurance && profile.insurance.policyNo) || ""}
          onChange={(v) => updateNested("insurance", { policyNo: v })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Allergies"
          id="allergies"
          value={profile.allergies}
          onChange={(v) => update("allergies", v)}
        />
        <Input
          label="Known Conditions"
          id="conditions"
          value={profile.conditions}
          onChange={(v) => update("conditions", v)}
        />
      </div>

      <TextArea
        label="Notes"
        id="notes"
        value={profile.notes}
        onChange={(v) => update("notes", v)}
      />

      <AvatarUploader
        avatar={profile.avatar}
        onChange={(url) => update("avatar", url)}
      />

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Save profile
        </button>
      </div>
    </form>
  );
}

function ProfileCard({ profile, onEdit, onView, onDelete }) {
  return (
    <div className="border rounded p-3 flex gap-3 items-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-500">N/A</span>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium">
              {profile.firstName} {profile.lastName}
            </div>
            <div className="text-sm text-gray-500">
              {profile.phone} • {profile.email}
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {new Date(profile.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {profile.conditions || "No conditions listed"}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onView(profile)}
          className="px-2 py-1 rounded bg-white border"
        >
          View
        </button>
        <button
          onClick={() => onEdit(profile)}
          className="px-2 py-1 rounded bg-yellow-100"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(profile)}
          className="px-2 py-1 rounded bg-red-100 text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      <button
        className="px-2 py-1 rounded border"
        onClick={() => onChange(Math.max(1, page - 1))}
      >
        Prev
      </button>
      <div className="px-2">
        Page {page} of {totalPages}
      </div>
      <button
        className="px-2 py-1 rounded border"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
      >
        Next
      </button>
    </div>
  );
}

export default function HealthcareProfileManager() {
  const [profiles, setProfiles] = useState(() => loadProfiles());
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("list"); // list | create | edit | view
  const [active, setActive] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => saveProfiles(profiles), [profiles]);

  function handleCreate() {
    setActive({ id: uid(), createdAt: new Date().toISOString() });
    setMode("create");
  }

  function handleSave(profile) {
    setProfiles((p) => {
      const exists = p.find((x) => x.id === profile.id);
      if (exists) {
        return p.map((x) => (x.id === profile.id ? { ...x, ...profile } : x));
      }
      return [profile, ...p];
    });
    setMode("list");
    setActive(null);
  }

  function handleEdit(profile) {
    setActive(profile);
    setMode("edit");
  }

  function handleDelete(profile) {
    if (
      !confirm(`Delete profile for ${profile.firstName} ${profile.lastName}?`)
    )
      return;
    setProfiles((p) => p.filter((x) => x.id !== profile.id));
  }

  function handleView(profile) {
    setActive(profile);
    setMode("view");
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return profiles;
    return profiles.filter((p) => {
      return [
        p.firstName,
        p.lastName,
        p.phone,
        p.email,
        p.conditions,
        p.allergies,
      ].some((field) => (field || "").toLowerCase().includes(q));
    });
  }, [profiles, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Healthcare Profile Manager</h1>
        <div className="flex gap-3 items-center">
          <input
            placeholder="Search by name, phone, condition"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded border"
          />
          {/* <button onClick={handleCreate} className="px-4 py-2 rounded bg-green-600 text-white">New Profile</button>git po */}
          <button
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY);
              setProfiles(loadProfiles());
            }}
            className="px-3 py-2 rounded bg-gray-200"
          >
            Reset
          </button>
        </div>
      </div>

      {mode === "list" && (
        <>
          <div className="grid gap-3">
            {pageItems.length === 0 && (
              <div className="p-4 text-center text-gray-500 border rounded">
                No profiles found.
              </div>
            )}
            {pageItems.map((p) => (
              <ProfileCard
                key={p.id}
                profile={p}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filtered.length} profiles
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </div>
        </>
      )}

      {(mode === "create" || mode === "edit") && (
        <div className="mt-4 border rounded">
          <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
            <div className="font-medium">
              {mode === "create"
                ? "Create new profile"
                : `Editing: ${active.firstName} ${active.lastName}`}
            </div>
            <div>
              <button
                onClick={() => {
                  setMode("list");
                  setActive(null);
                }}
                className="px-3 py-1 rounded border"
              >
                Back to list
              </button>
            </div>
          </div>
          <ProfileForm
            initial={active}
            onCancel={() => {
              setMode("list");
              setActive(null);
            }}
            onSave={handleSave}
          />
        </div>
      )}

      {mode === "view" && active && (
        <div className="mt-4 border rounded p-4 bg-white">
          <div className="flex gap-6">
            <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {active.avatar ? (
                <img
                  src={active.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-500">N/A</span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {active.firstName} {active.lastName}
              </h2>
              <div className="text-sm text-gray-600">
                DOB: {active.dob} • Gender: {active.gender}
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <div className="font-medium">Contact</div>
                  <div>{active.phone}</div>
                  <div>{active.email}</div>
                  <div>{active.address}</div>
                </div>
                <div>
                  <div className="font-medium">Emergency</div>
                  <div>
                    {(active.emergencyContact &&
                      active.emergencyContact.name) ||
                      "-"}{" "}
                    (
                    {(active.emergencyContact &&
                      active.emergencyContact.phone) ||
                      "-"}
                    )
                  </div>
                  <div className="mt-2 font-medium">Insurance</div>
                  <div>
                    {(active.insurance && active.insurance.provider) || "-"} •{" "}
                    {(active.insurance && active.insurance.policyNo) || "-"}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium">Allergies</div>
                  <div>{active.allergies || "None"}</div>
                </div>
                <div>
                  <div className="font-medium">Conditions</div>
                  <div>{active.conditions || "None"}</div>
                </div>
                <div>
                  <div className="font-medium">Notes</div>
                  <div>{active.notes || "-"}</div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(active)}
                  className="px-3 py-2 rounded bg-yellow-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(active)}
                  className="px-3 py-2 rounded bg-red-100 text-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setMode("list");
                    setActive(null);
                  }}
                  className="px-3 py-2 rounded border"
                >
                  Back to list
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
