import React, { useState, useEffect } from 'react'
import { HomeOutlined, PlusOutlined, MenuOutlined, MedicineBoxOutlined, BookOutlined, WechatFilled } from '@ant-design/icons';
import { FaCar, FaEye, FaGoogleDrive, FaImage, FaList, FaMountain, FaNewspaper, FaShip, FaSwimmer } from 'react-icons/fa'
import { Menu } from 'antd';
import { mobile } from '../utils/variables';


export default function MenuAdmin({ menuClick }) {

  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('home')

  const menuItems = [
    { key: 'homepage', menu: <p> <HomeOutlined /> Homepage</p>, subMenu: [] },
    {
      key: null, menu: <p> <BookOutlined /> Packages</p>, subMenu: [
        {
          key: null, menu: <p><BookOutlined /> Bali Package</p>, subMenu: [
            { key: 'packageBali', menu: <p> <MedicineBoxOutlined /> Add Package Name</p>, subMenu: [] },
            { key: 'packageBaliDetail', menu: <p> <MedicineBoxOutlined /> Add/Update Details</p>, subMenu: [] },

          ]
        },
        {
          key: null, menu: <p><BookOutlined /> Andaman Package</p>, subMenu: [
            { key: 'packageAndaman', menu: <p> <MedicineBoxOutlined /> Add Package Name</p>, subMenu: [] },
            { key: 'packageAndmanDetail', menu: <p> <MedicineBoxOutlined /> Add/Update Details</p>, subMenu: [] },

          ]
        },

      ]
    },

    {
      key: null, menu: <p><FaSwimmer /> Activities</p>, subMenu: [
        { key: 'activityBali', menu: <p ><FaSwimmer /> Bali Activity</p>, subMenu: [] },
        { key: 'activityAndaman', menu: <p><FaSwimmer /> Andaman Activity</p>, subMenu: [] },

      ]
    },

    { key: 'addcruises', menu: <p><FaShip /> Cruises</p>, subMenu: [] },

    {
      key: null, menu: <p><FaNewspaper /> Know</p>, subMenu: [
        { key: 'about-us', menu: <p >About Us</p>, subMenu: [] },
        { key: 'about-andman', menu: <p >About Andaman</p>, subMenu: [] },
        { key: 'about-bali', menu: <p >About Bali</p>, subMenu: [] },
        { key: 'dos-and-dont', menu: <p >{"Do's & Don't"}</p>, subMenu: [] },
        { key: 'generalInfo', menu: <p >{"General information"}</p>, subMenu: [] },
      ]
    },

    {
      key: null, menu: <p><FaEye /> What to See</p>, subMenu: [
        {
          key: null, menu: <p ><FaEye /> Destination</p>, subMenu: [
            { key: 'destinationAndaman', menu: <p> <MedicineBoxOutlined /> Andaman Destination</p>, subMenu: [] },
            { key: 'destinationBali', menu: <p> <MedicineBoxOutlined /> Bali Destination</p>, subMenu: [] },
          ]
        },

        {
          key: null, menu: <p ><FaEye /> Attraction</p>, subMenu: [
            { key: 'attractionAndaman', menu: <p> <MedicineBoxOutlined /> Andaman Attraction</p>, subMenu: [] },
            { key: 'attractionBali', menu: <p> <MedicineBoxOutlined /> Bali Attraction</p>, subMenu: [] },
          ]
        },

      ]
    },


    {
      key: null, menu: <p><FaCar /> Rentals</p>, subMenu: [
        { key: 'rentalBali', menu: <p ><FaCar /> Bali Rentals</p>, subMenu: [] },
        { key: 'rentalAndaman', menu: <p ><FaCar /> Andaman Rentals</p>, subMenu: [] },

      ]
    },


    { key: 'Testimonials', menu: <p><WechatFilled /> Testimonials</p>, subMenu: [] },
    { key: 'media', menu: <p><FaImage /> Media</p>, subMenu: [] },

  ]

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  return (
    <div>
      <Menu
        mode={'inline'}
        style={{
          // textTransform: 'uppercase',
          fontWeight: 'bold',
          height: '100%',
          borderRight: 0,
        }}
        disabledOverflow
        onClick={(e) => menuClick(e.key)}
        activeKey={active}
        theme={'dark'}
      >

        {menuItems.map((item, index) => (
          <>
            {item.key !== null
              ?
              (<Menu.Item key={item.key}>
                {item.menu}
              </Menu.Item>)
              :
              (<Menu.SubMenu title={item.menu}>
                {item.subMenu.map((subItem, index) => (
                  <>
                    {subItem.key !== null
                      ?
                      (<Menu.Item key={subItem.key}>
                        {subItem.menu}
                      </Menu.Item>)
                      :
                      (<Menu.SubMenu title={subItem.menu}>
                        {subItem.subMenu.map((subItem2, index) => (
                          <>
                            {subItem2.key !== null
                              ?
                              (<Menu.Item key={subItem2.key}>
                                {subItem2.menu}
                              </Menu.Item>)
                              :
                              (<Menu.SubMenu title={subItem2.menu}>

                              </Menu.SubMenu>)
                            }
                          </>

                        ))}
                      </Menu.SubMenu>)
                    }
                  </>

                ))}
              </Menu.SubMenu>)
            }
          </>

        ))}

      </Menu>
    </div>
  )
}
