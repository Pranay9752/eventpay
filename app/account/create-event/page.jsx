// app/events/new/page.tsx

import { createEventAction } from "./actions/add-event";

export default function CreateEventPage() {
  return (
      <div className="">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          🎉 Create Your Event
        </h1>
        <p className="text-slate-500 mb-8">
          Fill in the details below to bring your event to life!
        </p>

        {/* Form */}
        <form action={createEventAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Event Name
            </label>
            <input
              type="text"
              name="event_name"
              maxLength={100}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="e.g. Summer Fest 2025"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Event Address
            </label>
            <textarea
              name="event_address"
              maxLength={200}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="123 Event Street, City"
              rows={3}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Event Phone
              </label>
              <input
                type="text"
                name="event_phone"
                pattern="\d{10}"
                title="Please enter a valid 10-digit phone number"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
                placeholder="9876543210"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Alternate Phone
              </label>
              <input
                type="text"
                name="phoneNo"
                required
                pattern="\d{10}"
                title="Please enter a valid 10-digit phone number"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
                placeholder="9876543210"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="eventadmin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              minLength={8}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="At least 8 characters"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 text-white text-lg font-semibold py-3 rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform duration-300 ease-out"
          >
            🚀 Create Event
          </button>
        </form>
      </div>
  );
}
