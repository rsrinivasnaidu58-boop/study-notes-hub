import React, { useState, useMemo } from 'react';
import { Search, Home, ChevronRight, Download, Eye, X } from 'lucide-react';

const StudyNotesHub = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pdfPreview, setPdfPreview] = useState(null);

  // Sample data structure
  const subjects = [
    {
      id: 1,
      name: 'POM',
      fullName: 'Principles of Management',
      color: 'from-blue-500 to-blue-600',
      icon: '📊',
      chapters: [
        {
          id: 101,
          name: 'Introduction to Management',
          notes: [
            { id: 1001, title: 'Management Basics', size: '2.4 MB', url: '#' },
            { id: 1002, title: 'Evolution of Management', size: '1.8 MB', url: '#' },
            { id: 1003, title: 'Management Functions', size: '3.1 MB', url: '#' }
          ]
        },
        {
          id: 102,
          name: 'Planning and Decision Making',
          notes: [
            { id: 1004, title: 'Strategic Planning', size: '2.9 MB', url: '#' },
            { id: 1005, title: 'Decision Making Process', size: '2.2 MB', url: '#' }
          ]
        },
        {
          id: 103,
          name: 'Organization and Structure',
          notes: [
            { id: 1006, title: 'Organizational Design', size: '3.5 MB', url: '#' },
            { id: 1007, title: 'Authority and Delegation', size: '2.1 MB', url: '#' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'AFM',
      fullName: 'Advanced Financial Management',
      color: 'from-green-500 to-green-600',
      icon: '💰',
      chapters: [
        {
          id: 201,
          name: 'Financial Analysis',
          notes: [
            { id: 2001, title: 'Ratio Analysis', size: '2.6 MB', url: '#' },
            { id: 2002, title: 'Cash Flow Analysis', size: '2.3 MB', url: '#' }
          ]
        },
        {
          id: 202,
          name: 'Capital Budgeting',
          notes: [
            { id: 2003, title: 'Investment Appraisal', size: '3.2 MB', url: '#' },
            { id: 2004, title: 'NPV and IRR', size: '2.8 MB', url: '#' },
            { id: 2005, title: 'Payback Period', size: '1.9 MB', url: '#' }
          ]
        },
        {
          id: 203,
          name: 'Corporate Finance',
          notes: [
            { id: 2006, title: 'Capital Structure', size: '3.0 MB', url: '#' },
            { id: 2007, title: 'Dividend Policy', size: '2.4 MB', url: '#' }
          ]
        },
        {
          id: 204,
          name: 'Derivatives and Risk',
          notes: [
            { id: 2008, title: 'Futures and Options', size: '3.6 MB', url: '#' },
            { id: 2009, title: 'Risk Management', size: '2.9 MB', url: '#' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'AI',
      fullName: 'Artificial Intelligence',
      color: 'from-purple-500 to-purple-600',
      icon: '🤖',
      chapters: [
        {
          id: 301,
          name: 'Introduction to AI',
          notes: [
            { id: 3001, title: 'AI Fundamentals', size: '2.5 MB', url: '#' },
            { id: 3002, title: 'AI Applications', size: '2.7 MB', url: '#' }
          ]
        },
        {
          id: 302,
          name: 'Machine Learning',
          notes: [
            { id: 3003, title: 'Supervised Learning', size: '3.4 MB', url: '#' },
            { id: 3004, title: 'Unsupervised Learning', size: '3.1 MB', url: '#' },
            { id: 3005, title: 'Neural Networks', size: '3.8 MB', url: '#' }
          ]
        },
        {
          id: 303,
          name: 'Deep Learning',
          notes: [
            { id: 3006, title: 'Convolutional Neural Networks', size: '4.2 MB', url: '#' },
            { id: 3007, title: 'Recurrent Neural Networks', size: '3.9 MB', url: '#' },
            { id: 3008, title: 'Transformers', size: '3.5 MB', url: '#' }
          ]
        },
        {
          id: 304,
          name: 'Natural Language Processing',
          notes: [
            { id: 3009, title: 'Text Processing', size: '2.8 MB', url: '#' },
            { id: 3010, title: 'Sentiment Analysis', size: '2.6 MB', url: '#' }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'English',
      fullName: 'English Literature',
      color: 'from-red-500 to-red-600',
      icon: '📚',
      chapters: [
        {
          id: 401,
          name: 'Poetry',
          notes: [
            { id: 4001, title: 'Metaphor and Symbolism', size: '2.2 MB', url: '#' },
            { id: 4002, title: 'Rhyme and Meter', size: '1.9 MB', url: '#' }
          ]
        },
        {
          id: 402,
          name: 'Drama',
          notes: [
            { id: 4003, title: 'Shakespeare Basics', size: '2.8 MB', url: '#' },
            { id: 4004, title: 'Character Analysis', size: '2.5 MB', url: '#' }
          ]
        },
        {
          id: 403,
          name: 'Prose and Fiction',
          notes: [
            { id: 4005, title: 'Narrative Techniques', size: '2.4 MB', url: '#' },
            { id: 4006, title: 'Plot Structure', size: '2.1 MB', url: '#' }
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'Telugu',
      fullName: 'Telugu Language',
      color: 'from-yellow-500 to-yellow-600',
      icon: '🗣️',
      chapters: [
        {
          id: 501,
          name: 'Grammar Basics',
          notes: [
            { id: 5001, title: 'Nouns and Pronouns', size: '2.0 MB', url: '#' },
            { id: 5002, title: 'Verbs and Tenses', size: '2.3 MB', url: '#' }
          ]
        },
        {
          id: 502,
          name: 'Literature',
          notes: [
            { id: 5003, title: 'Classical Poetry', size: '2.6 MB', url: '#' },
            { id: 5004, title: 'Modern Writers', size: '2.4 MB', url: '#' }
          ]
        },
        {
          id: 503,
          name: 'Composition',
          notes: [
            { id: 5005, title: 'Letter Writing', size: '1.7 MB', url: '#' },
            { id: 5006, title: 'Essay Writing', size: '2.2 MB', url: '#' }
          ]
        }
      ]
    }
  ];

  // Search functionality
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    const results = [];

    subjects.forEach(subject => {
      if (subject.name.toLowerCase().includes(query) || subject.fullName.toLowerCase().includes(query)) {
        results.push({ type: 'subject', data: subject });
      }

      subject.chapters.forEach(chapter => {
        if (chapter.name.toLowerCase().includes(query)) {
          results.push({ type: 'chapter', data: chapter, subjectId: subject.id, subject });
        }

        chapter.notes.forEach(note => {
          if (note.title.toLowerCase().includes(query)) {
            results.push({ 
              type: 'note', 
              data: note, 
              chapter, 
              subjectId: subject.id, 
              subject 
            });
          }
        });
      });
    });

    return results;
  }, [searchQuery]);

  const handleDownloadPdf = (note) => {
    // Placeholder for PDF download
    alert(`Downloading: ${note.title}`);
  };

  const handleViewPdf = (note) => {
    setPdfPreview(note);
  };

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📖</div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Study Notes Hub</h1>
            </div>
            <p className="text-slate-600 text-sm sm:text-base">Free study materials for students</p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search subjects, chapters, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery && filteredResults ? (
          // Search Results
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Search Results ({filteredResults.length})
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={18} />
                Clear
              </button>
            </div>

            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">No results found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredResults.map((result, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition cursor-pointer"
                    onClick={() => {
                      if (result.type === 'subject') {
                        setSelectedSubject(result.data.id);
                        setCurrentPage('chapters');
                        setSearchQuery('');
                      } else if (result.type === 'chapter') {
                        setSelectedSubject(result.subjectId);
                        setSelectedChapter(result.data.id);
                        setCurrentPage('notes');
                        setSearchQuery('');
                      } else if (result.type === 'note') {
                        handleViewPdf(result.data);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {result.type === 'subject' && '📚'}
                        {result.type === 'chapter' && '📖'}
                        {result.type === 'note' && '📄'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900">
                          {result.type === 'subject' && result.data.name}
                          {result.type === 'chapter' && result.data.name}
                          {result.type === 'note' && result.data.title}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {result.type === 'subject' && result.data.fullName}
                          {result.type === 'chapter' && `${result.subject.name} > ${result.data.name}`}
                          {result.type === 'note' && `${result.subject.name} > ${result.chapter.name}`}
                        </p>
                        {result.type === 'note' && (
                          <p className="text-xs text-slate-500 mt-1">Size: {result.data.size}</p>
                        )}
                      </div>
                      <ChevronRight className="text-slate-400 flex-shrink-0" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Subjects Grid
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Select a Subject</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => {
                    setSelectedSubject(subject.id);
                    setCurrentPage('chapters');
                  }}
                  className="group h-full"
                >
                  <div className={`bg-gradient-to-br ${subject.color} rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition h-full flex flex-col justify-between`}>
                    <div>
                      <div className="text-5xl mb-4">{subject.icon}</div>
                      <h3 className="text-2xl font-bold mb-2">{subject.name}</h3>
                      <p className="text-white/90 mb-4">{subject.fullName}</p>
                    </div>
                    <div className="text-sm font-semibold text-white/80 group-hover:text-white transition flex items-center gap-2">
                      {subject.chapters.length} chapters
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );

  // Chapters Page Component
  const ChaptersPage = () => {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setSelectedSubject(null);
                  setSearchQuery('');
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <Home size={24} className="text-slate-600" />
              </button>
              <div>
                <p className="text-sm text-slate-600">Subject</p>
                <h1 className="text-2xl font-bold text-slate-900">{subject.fullName}</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search chapters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            {subject.chapters
              .filter(ch => !searchQuery || ch.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((chapter, idx) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setSelectedChapter(chapter.id);
                    setCurrentPage('notes');
                    setSearchQuery('');
                  }}
                  className="w-full text-left bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-lg transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="text-3xl flex-shrink-0">📖</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-lg text-slate-900 group-hover:text-blue-600 transition">
                          {chapter.name}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {chapter.notes.length} note{chapter.notes.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-400 group-hover:text-slate-600 transition flex-shrink-0" size={24} />
                  </div>
                </button>
              ))}
          </div>
        </main>
      </div>
    );
  };

  // Notes Page Component
  const NotesPage = () => {
    const subject = subjects.find(s => s.id === selectedSubject);
    const chapter = subject?.chapters.find(ch => ch.id === selectedChapter);
    if (!subject || !chapter) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-slate-900 transition"
                >
                  Study Notes Hub
                </button>
                <ChevronRight size={16} />
                <button
                  onClick={() => setCurrentPage('chapters')}
                  className="hover:text-slate-900 transition"
                >
                  {subject.name}
                </button>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">{chapter.name}</h1>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="bg-white border-b sticky top-20 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search notes in this chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-3">
            {chapter.notes
              .filter(note => !searchQuery || note.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(note => (
                <div
                  key={note.id}
                  className="bg-white p-5 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="text-2xl flex-shrink-0">📄</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-900">{note.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">File size: {note.size}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleViewPdf(note)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium text-sm"
                      >
                        <Eye size={18} />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button
                        onClick={() => handleDownloadPdf(note)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition font-medium text-sm"
                      >
                        <Download size={18} />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    );
  };

  // PDF Preview Modal Component
  const PdfModal = () => {
    if (!pdfPreview) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-slate-900 truncate">{pdfPreview.title}</h2>
            <button
              onClick={() => setPdfPreview(null)}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <X size={24} className="text-slate-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-slate-600 mb-6">{pdfPreview.title}</p>
              <p className="text-sm text-slate-500 mb-6">PDF Preview (Placeholder)</p>
              <button
                onClick={() => handleDownloadPdf(pdfPreview)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'chapters' && <ChaptersPage />}
      {currentPage === 'notes' && <NotesPage />}
      <PdfModal />
    </div>
  );
};

export default StudyNotesHub;
