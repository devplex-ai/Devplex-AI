import { useState } from 'react';

const Contact_form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Form submitted successfully!');

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
    }, 1000);
  };
  
  return (
    <div className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-start">
            <h2 className="text-4xl font-bold text-white mb-12">Have questions?<br/> We are here to help</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Email us</p>
                  <a href="mailto:contact@devplex.com" className="text-white hover:text-indigo-400 transition-colors">
                    devplexai@yahoo.com
                  </a>
                </div>
              </div>
              
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">
                    Bhopal, Madhya Pradesh<br />India
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white text-sm mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#151728] border border-[#2e3147] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#151728] border border-[#2e3147] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-white text-sm mb-2">Phone No.</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#151728] border border-[#2e3147] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="+91 ------------"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white text-sm mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-[#151728] border border-[#2e3147] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Subject"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white text-sm mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-[#151728] border border-[#2e3147] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="How Can we help you ?"
                />
              </div>
              
              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-md flex items-center transition-colors duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Submit 
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
            
            {submitMessage && (
              <div className="mt-4 p-4 bg-green-900 text-green-100 rounded-md text-center">
                {submitMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact_form;