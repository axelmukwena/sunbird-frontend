"use client";

import { BarChart2, Calendar, Download, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

import { HeaderOld } from "@/components/Header";

export const HomeView = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderOld />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-800 mb-4">
            Welcome to your digital sign-in sheet
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A modern solution to track meeting attendance across your
            organisation. No more passing around paper sheets - create meetings,
            track attendance, and analyze participation all in one place.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create Meeting Card */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 mb-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Create Meeting
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Schedule new meetings and generate unique attendance links.
            </p>
            <Link href="/meetings/create">
              <button className="mt-auto px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>

          {/* View Meetings Card */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50 mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              View Meetings
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Access past and scheduled meetings with detailed attendance
              records.
            </p>
            <Link href="/meetings">
              <button className="mt-auto px-4 py-2 text-sm text-green-600 border border-green-200 rounded-md hover:bg-green-50 transition-colors cursor-pointer">
                Browse Meetings
              </button>
            </Link>
          </div>

          {/* Attendance Stats Card */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-50 mb-4">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Attendance Stats
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Visualize attendance trends and participation metrics over time.
            </p>
            <button className="mt-auto px-4 py-2 text-sm text-purple-600 border border-purple-200 rounded-md hover:bg-purple-50 transition-colors cursor-pointer">
              View Analytics
            </button>
          </div>

          {/* Export Data Card */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-50 mb-4">
              <Download className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Export Data
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Download attendance records in various formats for reporting.
            </p>
            <button className="mt-auto px-4 py-2 text-sm text-amber-600 border border-amber-200 rounded-md hover:bg-amber-50 transition-colors cursor-pointer">
              Export Now
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-16">
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            Recent Activity
          </h2>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                You haven&apos;t created any meetings yet
              </span>
              <Link href="/meetings/create">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer">
                  Create Your First Meeting
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 Tendiflow. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Built with ❤️ by{" "}
              <Link
                className="underline"
                target="_blank"
                href="https://meyabase.com"
              >
                meyabase.com
              </Link>
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Help
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
