import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeGoods,
  toggleGoods,
  fetchGoods,
  filterGoods,
  filterGoodsAll,
} from './store/goodsSlice'
import './App.scss'

function App() {
  const goods = useSelector((state) => state.goods.goods)
  const goodsAll = useSelector((state) => state.goods.goodsAll)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGoods())
  }, [dispatch])

  const toggleItemGoods = (id) => {
    dispatch(toggleGoods({ id }))
  }

  const handleEvent = (event) => {
    if (event.type === 'mousedown') {
      dispatch(filterGoods(goods))
    } else {
      dispatch(filterGoodsAll(goodsAll))
    }
  }

  return (
    <div className='app'>
      <div className='app__row app__row--between'>
        <div className='app-header'>Товары</div>
        <button
          className='button-like'
          // onMouseDown={(event) => handleEvent(event.type)}
          onMouseDown={handleEvent}
          onMouseUp={handleEvent}
        >
          <span className='button-like__text'>Понравившиеся</span>
          <span className='button-like__icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
            </svg>
          </span>
        </button>
      </div>
      {goods.length ? (
        <div className='list-goods app__list'>
          {goods.map(
            ({
              id,
              title,
              image,
              price,
              category,
              completed = false,
              validFilter,
            }) => {
              return (
                <div div key={id} className='list-goods__item'>
                  <div className='list-goods__name'>{title}</div>
                  <div className='list-goods__img'>
                    <img src={image} alt='' />
                  </div>
                  <div className='list-goods__category'>
                    category: {category}
                  </div>
                  <div className='list-goods__data'>
                    <span className='list-goods__price'>{price} €</span>
                    <div className='list-goods-action list-goods__action'>
                      <span
                        className={
                          completed
                            ? 'list-goods-action__item list-goods-action__item--like list-goods-action__item--like-active'
                            : 'list-goods-action__item list-goods-action__item--like'
                        }
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          fill='currentColor'
                          viewBox='0 0 16 16'
                        >
                          <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
                        </svg>
                        <input
                          type='checkbox'
                          className='list-goods-action__checked'
                          value={completed.toString()}
                          checked={completed}
                          onChange={() => toggleItemGoods(id)}
                        />
                      </span>
                      <span
                        className='list-goods-action__item list-goods-action__item--del'
                        onClick={() => dispatch(removeGoods({ id }))}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 16 16'
                        >
                          <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                          <path
                            fillRule='evenodd'
                            d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
          )}
        </div>
      ) : (
        <div className='no-result'>Записей нет</div>
      )}
    </div>
  )
}

export default App
