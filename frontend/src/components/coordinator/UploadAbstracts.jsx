import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function CheckScore() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    abstract: '',
    title: '',
    keyword: '',
    domain: [],
  });

  const [domains, setDomains] = useState([]);
  const [submittedDomains, setSubmittedDomains] = useState([]);
  const [abstractList, setAbstractList] = useState([]);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
  const [error, setError] = useState('');
  const [loadingDomains, setLoadingDomains] = useState(true);
  const [sending, setSending] = useState(false);

  // Fetch domains on initial load or when submittedDomains changes
  useEffect(() => {
    const fetchDomains = async () => {
      setLoadingDomains(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/getDomains`, {
          withCredentials: true,
        });

        const options = res.data.data.domains
          .sort((a, b) => a.localeCompare(b)) // Sort alphabetically
          .map((domain) => ({
            value: domain,
            label: domain,
          }));

        setDomains(options);
      } catch (err) {
        console.error('Error fetching domains:', err);
      } finally {
        setLoadingDomains(false);
      }
    };

    fetchDomains();
  }, [submittedDomains]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDomainChange = (selected) => {
    const selectedValues = selected.map((option) => option.value);
    setFormData((prev) => ({ ...prev, domain: selectedValues }));
  };

  const clear = () => {
    setFormData({
      abstract: '',
      title: '',
      keyword: '',
      domain: [],
    });
    setError('');
  };

  const add = () => {
    const { title, abstract, keyword, domain } = formData;

    if (!title.trim() || !abstract.trim() || !keyword.trim() || domain.length === 0) {
      setError('Please fill in all fields before adding.');
      return;
    }

    const newAbstract = {
      abstract,
      title,
      domain,
      keywords: keyword.split(',').map((item) => item.trim()),
    };

    setAbstractList((prev) => [...prev, newAbstract]);
    setSubmittedDomains((prev) => [...new Set([...prev, ...domain])]);
    setSendButtonDisabled(false);
    clear();
  };

  const send = async () => {
    setSending(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_SIMILARITY_API_URL}/api/insert2`,
        abstractList,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      alert('Abstracts submitted successfully!');
      setAbstractList([]);
      setSendButtonDisabled(true);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = (index) => {
    const updatedList = abstractList.filter((_, i) => i !== index);
    setAbstractList(updatedList);
    if (updatedList.length === 0) setSendButtonDisabled(true);
  };

  return (
    <div className="flex flex-col md:flex-row pt-20 justify-evenly gap-8 bg-gray-100 min-h-screen">
      {/* Submission Form */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 m-1 mb-3 w-full md:w-1/3">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Submit Abstract</h1>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 w-full max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter Project Title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Abstract</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              rows="5"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Type your abstract here..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Domains</label>
            {loadingDomains ? (
              <div className="text-sm text-gray-500 mt-2">Loading domains...</div>
            ) : (
              <Select
                isMulti
                options={domains}
                value={domains.filter((option) => formData.domain.includes(option.value))}
                onChange={handleDomainChange}
                className="mt-1"
                placeholder="Select domains..."
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Keywords</label>
            <input
              type="text"
              name="keyword"
              value={formData.keyword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Comma-separated keywords"
              required
            />
          </div>
        </form>

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

        <div className="flex gap-4 mt-4">
          <button
            onClick={clear}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Clear
          </button>
          <button
            onClick={add}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Abstract List Display */}
      <div className="w-full md:w-1/3 p-6 bg-white shadow-md rounded-lg m-1 mb-3">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Abstract List for Faculty Verification</h2>
        <div className="bg-gray-100 p-4 rounded-md shadow-md h-80 overflow-y-auto border">
          {abstractList.length === 0 ? (
            <p className="text-gray-500">No abstracts added yet.</p>
          ) : (
            abstractList.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-200 rounded-md p-2 mb-2 border"
              >
                <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <button
          onClick={send}
          className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={sendButtonDisabled || sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default CheckScore;
